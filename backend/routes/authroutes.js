import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                message: "User already exist"
            });
        }



        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registered Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }



});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email"
            })
        }


        const passwordMatch = await bcrypt.compare(
            password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            "mysecretkey",
            { expiresIn: "7d" }
        );

        res.json({
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
export default router;