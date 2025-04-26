import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
}
