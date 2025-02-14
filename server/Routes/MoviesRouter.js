import express from 'express';
import { getMovies, importMovies } from "../Controllers/MovieController.js";
import { 
    updateUserProfile, 
    deleteUserProfile, 
    changeUserPassword, 
    getLikeMovies, 
    addLikeMovies, 
    deleteLikedMovies, 
    getUser, 
    deleteUser 
} from "../Controllers/UserController.js"; // Ensure these are correctly imported

import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public Routes
router.post("/import", importMovies);
router.get("/", getMovies);  // Changed POST to GET since it's fetching data

// Private Routes
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikeMovies);
router.post("/favorites", protect, addLikeMovies);  // Changed GET to POST for adding a favorite
router.delete("/favorites", protect, deleteLikedMovies);  // Changed GET to DELETE for removing a favorite

// Admin Routes
router.get("/users", protect, admin, getUser);  // Changed "/" to "/users" for clarity
router.delete("/users/:id", protect, admin, deleteUser);

export default router;
