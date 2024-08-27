import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const connection = mongoose.connection;

    connection.on("collected", () => {
      console.log(`Connected to MongoDB`);
    });

    connection.on("error", (error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDB;