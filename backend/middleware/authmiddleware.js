import jwt from "jsonwebtoken";


const authMiddleware = (req,res,next)=>{

 const token = req.header("Authorization");
 console.log("TOKEN RECEIVED:", token);

 if(!token){
  return res.status(401).json({
   message:"Access Denied"
  });
 }

 try{

  const verified = jwt.verify(
   token,
   "mysecretkey"
  );

  req.user = verified;

  next();

 }catch(error){

  res.status(400).json({
   message:error.message
  });

 }

};



export default authMiddleware;