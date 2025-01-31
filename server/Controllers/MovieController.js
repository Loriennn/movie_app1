import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// Import movies into the database
// Route: POST /api/movies/import
// Access: Public
const importMovies = asyncHandler(async (req, res) => {
    try {
        await Movie.deleteMany(); // Clear existing movies before importing new ones
        const movies = await Movie.insertMany(MoviesData);
        res.status(201).json({ message: "Movies imported successfully", movies });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all movies with filtering and pagination
// Route: GET /api/movies
// Access: Public
const getMovies = asyncHandler(async (req, res) => {
    try {
        const { category, time, language, rate, year, search, pageNumber } = req.query;

        // Build query based on filters
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        };

        // Pagination settings
        const page = Number(pageNumber) || 1;
        const limit = 2; // 2 movies per page
        const skip = (page - 1) * limit;

        // Fetch movies with filters, pagination, and sorting by newest
        const movies = await Movie.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total number of movies matching the query
        const count = await Movie.countDocuments(query);

        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), // Total number of pages
            totalMovies: count,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single movie by ID
// Route: GET /api/movies/:id
// Access: Public
const getMovieById = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            res.status(404);
            throw new Error("Movie not found");
        }

        res.json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get top-rated movies
// Route: GET /api/movies/rated/top
// Access: Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find().sort({ rate: -1 }).limit(5); // Get top 5 rated movies
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { importMovies, getMovies, getMovieById, getTopRatedMovies };
