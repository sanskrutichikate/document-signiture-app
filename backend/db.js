import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("process.env.mongodb+srv://admin:Nidhi20cluster0.f7bzd41.mongodb.net//document-signature-app?appName=Cluster0");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
  }
};

export default connectDB;
