import express from "express";
import upload from "../middleware/uploadmiddleware.js";
import authmiddleware from "../middleware/authmiddleware.js";
import Document from "../models/document.js";


const router=express.Router();
router.post("/upload" ,authmiddleware ,upload.single("pdf"), async(req ,res)=>{
    try{
        const savedDocument=await Document.create({
        filename:req.file.originalname,
        filepath:req.file.path,
        uploadedby:req.user.id

    });

   res.status(201).json({
    message:"File uploaded successfully"
   });

}  catch(error){
        console.log(error);
    res.status(500).json({
        message:error.message
    });
}

});

export default router;
