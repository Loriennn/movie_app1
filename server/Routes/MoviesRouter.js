import express from 'express';
import { getMovies, importMovies } from "../Controllers/MovieController.js";
import { 
    updateUserProfile, 
    deleteUserProfile, 
    changeUserPassword, 
    getLikeMovies, 
    addLikeMovies, 
    deleteLikedMovies, 
    getUsers,  // Changed from getUser for clarity
    deleteUser 
} from "../Controllers/UserController.js";

import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public Routes
router.get("/", getMovies);  
router.post("/import", protect, admin, importMovies);  // Protected for admin

// Private Routes
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikeMovies);
router.post("/favorites", protect, addLikeMovies);
router.delete("/favorites", protect, deleteLikedMovies);

// Admin Routes
router.get("/users", protect, admin, getUsers);  // Changed from getUser to getUsers
router.delete("/users/:id", protect, admin, deleteUser);

export default router;
