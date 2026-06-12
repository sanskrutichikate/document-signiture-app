import mongoose from "mongoose";

const signatureSchema=new mongoose.Schema({
    fileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
        required:true,
    },
    signer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    x:{
        type:Number,
        required:true,
    },
    y:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Signed"],
        default:"Pending",
    },
},
    { timestamps: true }
);

export default mongoose.model("Signature", signatureSchema);