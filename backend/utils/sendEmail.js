import nodemailer from "nodemailer";

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
const sendSignatureEmail=async(to ,link)=>{
    await transporter.sendMail({
        from: process.env.EMAIL,
    to,
    subject: "Document Signature Request",
    text: `Click here to sign the document: ${link}`

    });

    
    
};
export default sendSignatureEmail;