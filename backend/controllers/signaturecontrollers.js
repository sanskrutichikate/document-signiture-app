
import Signature from "../models/signature.js";
import crypto from "crypto";
import sendSignatureEmail from "../utils/sendEmail.js";

const createSignatureRequest = async (req, res) => {
    try {
        const { fileId, signerEmail, x, y } = req.body;

        const token = crypto.randomBytes(20).toString("hex");

        const signature = await Signature.create({
            fileId,
            signerEmail,
            x,
            y,
            token
        });

        const signingLink = `http://localhost:5173/sign/${token}`;

        console.log("Signing Link:", signingLink);

        res.status(201).json({
            message: "Signature request created",
            signature
        });
    } catch (error) {
        res.status(500).json({
            message: "Error generating signature request",
            error: error.message
        });
    }
}

    const getSignatureByToken = async (req, res) => {
        try {
            const { token } = req.params;

            const signature = await Signature.findOne({ token }).populate("fileId");

            if (!signature) {
                return res.status(404).json({
                    message: "Invalid or expired link"
                });
            }

            res.status(200).json(signature);

        } catch (error) {
            res.status(500).json({
                message: "Error fetching signature request",
                error: error.message
            });
        }
    };

    const signDocument = async (req, res) => {  //for signing
  try {
    const { token } = req.params;

    const signature = await Signature.findOne({ token });

    if (!signature) {
      return res.status(404).json({
        message: "Signature request not found"
      });
    }

    signature.isSigned = true;
    signature.status = "Signed";

    await signature.save();

    res.status(200).json({
      message: "Document signed successfully",
      signature
    });

  } catch (error) {
    res.status(500).json({
      message: "Error signing document",
      error: error.message
    });
  }
};

export { createSignatureRequest ,getSignatureByToken ,signDocument};
