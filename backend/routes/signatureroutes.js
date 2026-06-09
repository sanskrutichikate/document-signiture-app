import express from "express";
import Signature from "../models/signature.js";

const router = express.Router();

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

export default router;