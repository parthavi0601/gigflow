import mongoose from "mongoose";
import { User } from "./src/models/User.model";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("No MONGO_URI found in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");
    
    const result = await User.deleteOne({ email: "parthavi060@gmail.com" });
    console.log(`Deleted ${result.deletedCount} ghost user(s) with email parthavi060@gmail.com`);
    
    // Also log any other unverified users just in case
    const unverified = await User.find({ isVerified: false });
    if (unverified.length > 0) {
      console.log(`Found ${unverified.length} other unverified users. Deleting them...`);
      await User.deleteMany({ isVerified: false });
      console.log("Cleaned up all unverified ghost users.");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
