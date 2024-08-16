import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const DB = process.env.DATABASE_URI
const DB = process.env.DATABASE_URI2
const DB_NAME = process.env.DATABASE_NAME

// const connectToMongodb = async () => {
//   try {
//     await mongoose.connect(`${DB}`);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log("Error in connecting to Mongodb", error.message);
//   }
// };

const connectToMongodb = async () => {
  try {
    await mongoose.connect(`${DB}/${DB_NAME}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to Mongodb", error.message);
  }
};

connectToMongodb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at  port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => console.log("MongoDB connection failed !!!", error.message));
  