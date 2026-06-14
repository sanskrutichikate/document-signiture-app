import audit from "../models/audit.js";

const auditMiddleware=async(req,res,next)=>{
    try{
        req.createAuditlog=async(fileId)=>{
            await audit.create({
                fileId,
                signer:req.user.id,
                ipAddress:req.ip,
            });
        };
        next();
    
    } catch(error){
        res.status(500).json({
             message:"Audit middleware error"
        });
    }
};
export default auditMiddleware;