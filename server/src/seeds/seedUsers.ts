import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.model";
import { env } from "../config/env";

const SEED_USERS = [
  { name: "Admin User", email: "admin@example.com", password: "Admin@123", role: "admin" as const },
  { name: "Sales User", email: "sales@example.com", password: "Sales@123", role: "sales" as const },
];

export const seedUsers = async () => {
  for (const userData of SEED_USERS) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      await User.create({ ...userData, password: hashedPassword });
      console.log(`Seeded user: ${userData.email}`);
    }
  }
};

if (require.main === module) {
  mongoose.connect(env.MONGO_URI).then(async () => {
    await seedUsers();
    await mongoose.disconnect();
    console.log("Seeding complete");
    process.exit(0);
  });
}
