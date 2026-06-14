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

        const signature = await Signature.findOne({ fileId });

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

        // ✅ IMPORTANT FIX: correct field name
        const pdfPath = document.filePath || document.filepath || document.file;

        console.log("Signature Data:", signature);
        console.log("PDF Path:", pdfPath);

        if (!pdfPath) {
            return res.status(400).json({
                message: "PDF path missing in document"
            });
        }

        const existingPdfBytes = fs.readFileSync(pdfPath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const pageHeight = firstPage.getHeight(); // ✅ FIX FOR PDF COORDINATES

        firstPage.drawText(signature.signer.toString(), {
            x: signature.x,
            y: pageHeight - signature.y, // ✅ FIXED POSITION
            size: 20,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();

        // ✅ ensure folder exists
        const outputDir = path.join("signed");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputPath = path.join(
            outputDir,
            `signed-${fileId}.pdf`
        );

        fs.writeFileSync(outputPath, pdfBytes);

        // ✅ FINAL FIX: return URL (NOT local path)
        res.status(200).json({
            message: "Signed Pdf generated",
            file: `/signed/signed-${fileId}.pdf`
        });

    } catch (error) {
        console.log("FULL ERROR:", error);

        res.status(500).json({
            message: "Error generating signed pdf",
            error: error.message
        });
    }
});

export default router;