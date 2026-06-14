import express from "express";
import audit from "../models/audit.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router =express.Router();


router.get("/:fileId", authMiddleware, async (req, res) => {
  try {
    const logs = await Audit.find({
      fileId: req.params.fileId
    });
    res.status(200).json(logs);
}
catch(error){
    res.status(500).json({
        message:error.message
    });
}
});
export default router;