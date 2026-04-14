import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "interview-platform" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const userData = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    };

    // Use upsert to avoid duplicate-key errors if the webhook fires more than once
    await User.findOneAndUpdate(
      { clerkId: id },
      userData,
      { upsert: true, new: true }
    );

    await upsertStreamUser({
      id: userData.clerkId.toString(),
      name: userData.name,
      image: userData.profileImage,
    });
  }
);

const updateUser = inngest.createFunction(
  { id: "update-user" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const userData = {
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    };

    await User.findOneAndUpdate({ clerkId: id }, userData);

    await upsertStreamUser({
      id: id.toString(),
      name: userData.name,
      image: userData.profileImage,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, updateUser, deleteUserFromDB];