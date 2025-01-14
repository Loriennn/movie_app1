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

export {registerUser};

// Login user
// Route: POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user in DB
        const user = await User.findOne({ email });

        // If user exists, compare password with the hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            // If user is not found or password doesn't match, send an error message
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { loginUser };

// *private controller
// update user profile
// route: PUT /api/users/profile

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;

    try {
        // Find user in DB
        const user = await User.findById(req.user._id);

        // If user exists, update user data and save it to DB
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();

            // Send updated user data and token to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        } else {
            // If user not found, send error
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: error.message });
    }
});

export { updateUserProfile};
