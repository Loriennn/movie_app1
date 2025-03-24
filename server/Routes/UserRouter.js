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
    getUser, 
    deleteUser 
} from '../Controllers/UserController.js';
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public Routes
router.post("/", registerUser);
router.post("/login", loginUser);

// Private Routes (需要用户登录)
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikeMovies);
router.post("/favorites", protect, addLikeMovies);
router.delete("/favorites", protect, deleteLikedMovies);

// Admin Routes (需要管理员权限)
router.get("/all", protect, admin, getUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
