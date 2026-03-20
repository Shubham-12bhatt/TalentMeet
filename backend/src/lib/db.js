import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  }
  catch (error) {
    console.log("error connecting to database");
    process.exit(1);
  }
}