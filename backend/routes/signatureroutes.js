import express from "express";
import Signature from "../models/signature.js";
import { createSignatureRequest,getSignatureByToken,signDocument } from "../controllers/signaturecontrollers.js";

const router = express.Router();

// Save Signature
router.post("/save", async (req, res) => {
  try {
    const { fileId, signer, x, y } = req.body;

    const signature = await Signature.findOneAndUpdate(
      { fileId, signer },
      { x, y },
      { new: true, upsert: true }
    );

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

router.get("/:fileId", async (req, res) => {
  try {
       const signature = await Signature.findOne({
      fileId: req.params.fileId,
    });

    res.json(signature);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/request",createSignatureRequest);  //signature  request
  router.get("/public/:token", getSignatureByToken);
    router.put("/sign/:token", signDocument);


// Test Route
router.post("/", (req, res) => {
  console.log("Signature API hit");

  res.json({
    message: "Success",
  });



  
});

export default router;