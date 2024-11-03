import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `\nMongoDB connected\nDB-Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    throw error;
  }
}

export default connectDB;
