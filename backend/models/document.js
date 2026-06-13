import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    filename: {
        type: String,
        
        required: true

    },
    filepath: {
        type: String,
        required: true

    },
    uploadedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }

);

const document = mongoose.model(
    "document", documentSchema
);
export default document;