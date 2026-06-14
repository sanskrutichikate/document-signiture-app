import mongoose from "mongoose";

const auditSchema=new mongoose.Schema({
    fileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"document",
         required: true,
    },
    signer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    action:{
        type:String,
        default:"Signed",
    },

    ipAddress: {
    type: String,
    required: true,
  },
  signedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("audit",auditSchema);