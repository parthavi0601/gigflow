import dns from "dns";
import mongoose from "mongoose";
import app from "./app";

dns.setDefaultResultOrder("ipv4first");
import { env } from "./config/env";
import { seedUsers } from "./seeds/seedUsers";

const start = async () => {
  const isAtlas = env.MONGO_URI.includes("mongodb.net");
  await mongoose.connect(env.MONGO_URI, {
    ...(isAtlas &&
      env.NODE_ENV === "development" && {
        tlsAllowInvalidCertificates: true,
      }),
  });
  console.log("Connected to MongoDB");

  await seedUsers();

  app.listen(env.PORT, () => {
    console.log(`GigFlow API running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  if (err instanceof Error && err.name === "MongooseServerSelectionError") {
    const local = env.MONGO_URI.includes("127.0.0.1") || env.MONGO_URI.includes("localhost");
    if (local) {
      console.error("\nLocal MongoDB not reachable. Start it with:\n  docker compose up mongo -d\n");
    } else {
      console.error(
        "\nMongoDB Atlas connection failed. In Atlas → Network Access, add your IP (or 0.0.0.0/0 for dev).\n" +
          "Or use local MongoDB: docker compose up mongo -d\n" +
          "Then set MONGO_URI=mongodb://127.0.0.1:27017/gigflow in server/.env\n"
      );
    }
  }
  process.exit(1);
});
