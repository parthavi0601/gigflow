import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env";
import { seedUsers } from "./seeds/seedUsers";

const start = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to MongoDB");

  await seedUsers();

  app.listen(env.PORT, () => {
    console.log(`GigFlow API running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
