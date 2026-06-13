import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "document",
    required: true,
  },

  signer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  signerEmail: {
    type: String,
    required: true,
  },

  x: {
    type: Number,
    required: true,
  },

  y: {
    type: Number,
    required: true,
  },

  token: {
    type: String,
    required: true,
    unique: true,
  },

  isSigned: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["Pending", "Signed", "Rejected"],
    default: "Pending",
  },
}, {
  timestamps: true
});

export default mongoose.model("Signature", signatureSchema);