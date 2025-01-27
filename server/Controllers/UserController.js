import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/UserModels.js";
import { generateToken } from "../middlewares/Auth.js";

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashedPassword });

    if (user) {
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Error creating user" });
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Change user password
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (user && (await bcrypt.compare(oldPassword, user.password))) {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } else {
        res.status(400).json({ message: "Invalid current password" });
    }
});

// Get liked movies
const getLikedMovies = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("likedMovies");

    if (user) {
        res.json(user.likedMovies);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Add a movie to liked movies
const addLikedMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        if (!user.likedMovies.includes(movieId)) {
            user.likedMovies.push(movieId);
            await user.save();
            res.json(user.likedMovies);
        } else {
            res.status(400).json({ message: "Movie already liked" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete all liked movies
const deleteLikedMovies = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.likedMovies = [];
        await user.save();
        res.json({ message: "All liked movies deleted" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

export {
    registerUser,
    loginUser,
    updateUserProfile,
    changeUserPassword,
    getLikedMovies,
    addLikedMovie,
    deleteLikedMovies,
};
