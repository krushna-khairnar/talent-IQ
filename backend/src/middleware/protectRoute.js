import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      // @clerk/express v1+: req.auth is a function, not an object
      const auth = typeof req.auth === "function" ? req.auth() : req.auth;
      const clerkId = auth?.userId;

      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      // If the user doesn't exist yet (webhook may be delayed),
      // fetch their info from Clerk and create them on the fly
      if (!user) {
        try {
          const { createClerkClient } = await import("@clerk/express");
          // Build a Clerk backend client using the secret key
          const clerkClient = createClerkClient({
            secretKey: process.env.CLERK_SECRET_KEY,
          });

          const clerkUser = await clerkClient.users.getUser(clerkId);

          const name =
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            clerkUser.emailAddresses[0]?.emailAddress ||
            "Unknown";

          user = await User.findOneAndUpdate(
            { clerkId },
            {
              clerkId,
              email: clerkUser.emailAddresses[0]?.emailAddress,
              name,
              profileImage: clerkUser.imageUrl,
            },
            { upsert: true, new: true }
          );

          // Also sync to Stream
          const { upsertStreamUser } = await import("../lib/stream.js");
          await upsertStreamUser({
            id: clerkId,
            name: user.name,
            image: user.profileImage,
          });
        } catch (clerkError) {
          console.error("Error creating user from Clerk:", clerkError);
          return res.status(404).json({ message: "User not found" });
        }
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];