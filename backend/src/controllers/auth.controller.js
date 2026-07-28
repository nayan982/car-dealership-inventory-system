import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Name is required",
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        return res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }


        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
        });


    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

export const logoutUser = async (req, res) => {

    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout successful"
    });

};