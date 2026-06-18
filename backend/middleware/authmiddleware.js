import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, "mysecretkey");

    const user = await User.findById(verified.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // ✅ now you have email, name, etc.

    next();

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export default authMiddleware;