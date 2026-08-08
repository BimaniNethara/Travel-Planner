import mongoose from "mongoose";

// Connects to MongoDB using the URI in .env.
// This function is called once, when the server starts up.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // If we can't connect to the database, there's no point running the server.
    process.exit(1);
  }
};

export default connectDB;
