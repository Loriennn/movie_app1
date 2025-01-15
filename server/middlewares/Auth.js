import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";

//authenticated user and get token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};

// Protection middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token and decode user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user and attach to request object
            req.user = await User.findById(decoded.id).select("-password");

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    // If token is missing, return error
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});



export { generateToken, protect};
