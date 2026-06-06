import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

connectDB();

const app = express();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});