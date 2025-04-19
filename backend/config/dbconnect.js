import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
  }
};
