import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome User",
    user: req.user
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

