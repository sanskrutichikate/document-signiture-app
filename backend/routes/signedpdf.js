import express from "express";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import Signature from "../models/signature.js";
import Document from "../models/document.js";

const router = express.Router();
router.post("/generate/:fileId", async (req, res) => {
    try {
        const { fileId } = req.params;

        const signature = await Signature.findOne({ fileId });  //find saved signature

        if (!signature) {
            return res.status(404).json({
                message: "Signature not found"
            });
        }
      const document = await Document.findById(fileId);

        if (!document) {
            return res.status(404).json({
                message: "File not found"
            });
        }

       const pdfPath = document.filepath;

        console.log("Signature Data:", signature);
        console.log("PDF Path:", pdfPath);

        const existingPdfBytes = fs.readFileSync(pdfPath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        firstPage.drawText(signature.signer.toString(), {
            x: signature.x,
            y: signature.y,
            size: 20,
            color: rgb(0, 0, 0)
        });

        const pdfBytes = await pdfDoc.save();

        const outputPath = path.join(
            "signed",
            `signed-${fileId}.pdf`
        );

        fs.writeFileSync(outputPath, pdfBytes);

        res.status(200).json({
            message: "Signed Pdf generated",
            file: outputPath

        });
    }
    catch (error) {
        console.log("FULL ERROR:", error);

        res.status(500).json({
            message: "Error generating signed pdf",
            error:error.message
        });
    }


});
export default router;