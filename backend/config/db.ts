import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("[MongoDB] MONGODB_URI not set. Running in resilient In-Memory & Hybrid Cache mode.");
    return false;
  }

  try {
    if (mongoose.connection.readyState >= 1) {
      isConnected = true;
      return true;
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });

    isConnected = true;
    console.log("[MongoDB] Connected successfully to MongoDB Atlas.");
    return true;
  } catch (error) {
    console.warn("[MongoDB] Connection warning (falling back to hybrid in-memory store):", (error as Error).message);
    isConnected = false;
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected;
}
