import express from 'express';
import { 
    registerUser, 
    loginUser, 
    updateUserProfile, 
    deleteUserProfile, 
    changeUserPassword,
    getLikeMovies, 
    addLikeMovies, 
    deleteLikedMovies, 
    getUsers,        // renamed for clarity
    deleteUser 
} from '../Controllers/UserController.js';

import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// =========================
// Public Routes (No Auth)
// =========================
router.post("/", registerUser);
router.post("/login", loginUser);

// =========================
// Private Routes (User Auth Required)
// =========================
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);

// Favorite Movies
router.get("/favorites", protect, getLikeMovies);
router.post("/favorites", protect, addLikeMovies);
router.delete("/favorites", protect, deleteLikedMovies);

// =========================
// Admin Routes (Admin Auth Required)
// =========================
router.get("/all", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

// =========================
// Fallback 404 Handler
// =========================
router.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default router;
