import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// Start the server and listen for incoming connections
app.listen(ENV.PORT, () => {
  console.log(`Example app listening at http://localhost:${ENV.PORT}`);
});