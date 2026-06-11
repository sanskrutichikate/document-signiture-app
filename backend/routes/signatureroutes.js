import express from "express";
import Signature from "../models/signature.js";

const router = express.Router();

// Save Signature
router.post("/save", async (req, res) => {
  try {
    const { fileId, signer, x, y } = req.body;

    const signature = new Signature({
      fileId,
      signer,
      x,
      y,
    });

    await signature.save();

    res.status(201).json({
      message: "Signature saved successfully",
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Test Route
router.post("/", (req, res) => {
  console.log("Signature API hit");

  res.json({
    message: "Success",
  });
});

export default router;