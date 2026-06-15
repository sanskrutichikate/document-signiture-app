import express from "express";
import Signature from "../models/signature.js";
import authMiddleware from "../middleware/authmiddleware.js";
import auditMiddleware from "../middleware/auditmiddleware.js";
import { createSignatureRequest, getSignatureByToken, signDocument } from "../controllers/signaturecontrollers.js";

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



router.post("/request", createSignatureRequest);  //signature  request
router.get("/public/:token", getSignatureByToken);
router.put("/sign/:token", authMiddleware, auditMiddleware, signDocument);


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




router.post("/accept/:id", async (req, res) => {           //signature acccept api route
  try {
    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({
        message: "Signature not found",
      });
    }
    signature.status = "Signed";
    signature.isSigned = true;
    signature.signedAt = new Date();

    await signature.save();

    res.json({
      message: "Document signed successfully",
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error accepting signature",
      error: error.message,
    });

  }
});


router.post("/reject/:id", async (req, res) => {          //reject api route
  try {
    const { reason } = req.body;

    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({ message: "Signature not found" });
    }

    signature.status = "Rejected";
    signature.rejectionReason = reason;

    await signature.save();

    res.json({
      message: "Document rejected",
      signature,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error rejecting document",
      error: error.message,
    });
  }
});


router.post("/status/:id",async(req ,res)=>{       //status  api  route
  try{
    const signature = await Signature.findById(req.params.id);
    if(!signature){
      return res.status(404).json({ message:"Not found" });
    }


    res.json({
      status: signature.status,
      rejectionReason: signature.rejectionReason,
    });
  }  

  catch(error){
    res.status(500).json({
            message: "Error fetching status",
      error: error.message,

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