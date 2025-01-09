import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/UserModels.js";
import { generateToken } from "../middlewares/Auth.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in the database
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        // If user is created successfully, send response
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { registerUser };
