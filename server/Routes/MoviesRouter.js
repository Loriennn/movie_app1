import express from 'express';
import { 
    getMovies, 
    getMovieById,
    getRandomMovies, 
    getTopRatedMovies, 
    importMovies 
} from "../Controllers/MovieController.js";

import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public Routes
router.get("/", getMovies);  
router.get("/:id", getMovieById);
router.get("/rated/top", getTopRatedMovies);
router.get("/random/all", getRandomMovies);

// Admin Route (Only Admin can import movies)
router.post("/import", protect, admin, importMovies);

export default router;
