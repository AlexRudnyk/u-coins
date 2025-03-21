import mongoose from "mongoose";

const connect = async () => {
  try {
    if (!process.env.DB_HOST) throw new Error("DB_HOST is missing");
    await mongoose.connect(process.env.DB_HOST);
    console.log("Mongo connection successful");
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    console.log("Error connecting to MongoDB:", error);
    throw new Error(`Error connecting to MongoDB: ${errorMessage}`);
  }
};

export default connect;
