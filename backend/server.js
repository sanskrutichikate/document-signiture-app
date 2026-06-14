import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import authmiddleware from "./middleware/authmiddleware.js";
import documentroutes from "./routes/documentroutes.js";
import path from "path";
import cors from "cors";
import signatureroutes from "./routes/signatureroutes.js";
import signedPdfroutes from "./routes/signedpdf.js";
import auditroutes from "./routes/auditroutes.js";
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

app.use("/api/auth", authRoutes);

app.get("/profile", authmiddleware, (req, res) => {
  res.json({
    message: "Welcome User",
    user: req.user
  });
});

app.use("/api/docs", documentroutes);



app.use("/api/documents",documentroutes);
app.use("/api/signature", signatureroutes);
app.use("/api/signedpdf",signedPdfroutes);
app.use("/signed", express.static("signed"));
app.use("/api/audit", auditroutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

