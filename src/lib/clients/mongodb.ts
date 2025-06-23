import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB() {
  if(isConnected) return

  try {
    const conn = await mongoose.connect(process.env.DB_STRING as string);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
}
