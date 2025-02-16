import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";

// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user (excluding password) and attach to request
            req.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
            return;
        }
    }

    // If no token is found
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
});

export { generateToken, protect };
