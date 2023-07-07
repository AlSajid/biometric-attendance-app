import errorHandler from "@/utils/errorHandler";
import mongoose from "mongoose";

export default async function connect() {
  if (mongoose.connection.readyState === 1) {
    console.log("✔ MongoDB already connected");
    return;
  }

  const uri = `mongodb+srv://AlSajid:MonirBhai@biometric-attendance.pji39yi.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, { dbName: "biometric-attendance" });
    console.log("👍 connected");
    return true;
  } catch (error) {
    errorHandler(error);
  }
}
