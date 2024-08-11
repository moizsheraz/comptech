import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({
  path: "./.env",
});

const DB_Name = process.env.DATABASE_NAME;
const DB = process.env.DATABASE_URI;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectToMongodb = async () => {
  try {
    await mongoose.connect(`${DB}/${DB_Name}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to Mongodb", error.message);
  }
};

connectToMongodb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `⚙️ Server is running at  port : ${process.env.PORT || 8000}`
      );
    });
  })
  .catch((error) =>
    console.log("MongoDB connection failed !!!", error.message)
  );
