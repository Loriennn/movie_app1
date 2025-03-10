import Movie from "../Models/MoviesModel.js";
import { MoviesData } from "../Data/MovieData.js";
import asyncHandler from "express-async-handler";

// Import movies into the database
const importMovies = asyncHandler(async (req, res) => {
    try {
        await Movie.deleteMany();
        const movies = await Movie.insertMany(MoviesData);
        res.status(201).json({ message: "Movies imported successfully", movies });
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Get all movies with filtering and pagination
const getMovies = asyncHandler(async (req, res) => {
    try {
        const { category, time, language, rate, year, search, pageNumber } = req.query;

        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        };

        const page = parseInt(pageNumber) || 1;
        const limit = 2;
        const skip = (page - 1) * limit;

        const movies = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const count = await Movie.countDocuments(query);

        res.json({ movies, page, pages: Math.ceil(count / limit), totalMovies: count });
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Get a single movie by ID
const getMovieById = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404);
            throw new Error("Movie not found");
        }
        res.json(movie);
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Get top-rated movies
const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find().sort({ rating: -1 }).limit(5);
        res.json(movies);
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Get random movies
const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
        res.json(movies);
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Create a movie review
const createMovieReview = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        const { rating, comment } = req.body;

        if (!req.user) {
            res.status(401);
            throw new Error("Not authorized to review");
        }

        if (!movie) {
            res.status(404);
            throw new Error("Movie not found");
        }

        const alreadyReviewed = movie.reviews.find(
            (r) => r.userId.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("You already reviewed this movie");
        }

        // Create a new review
        const review = {
            userName: req.user.fullName,
            userId: req.user._id,
            userImage: req.user.image,
            rating: Number(rating),
            comment,
        };

        // Push the new review to the reviews array
        movie.reviews.push(review);
        movie.numberOfReviews = movie.reviews.length;

        // Calculate the new average rating
        movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

        // Save the movie in the database
        await movie.save();

        res.status(201).json({ message: "Review added" });
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Update movie details (Admin only)
const updateMovie = asyncHandler(async (req, res) => {
    try {
        const { name, desc, image, titleImage, rate, numberOfReviews, category, time, language, year, video, casts } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            res.status(404);
            throw new Error("Movie not found");
        }

        // Update movie fields if provided in the request body
        movie.name = name || movie.name;
        movie.desc = desc || movie.desc;
        movie.image = image || movie.image;
        movie.titleImage = titleImage || movie.titleImage;
        movie.rate = rate || movie.rate;
        movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
        movie.category = category || movie.category;
        movie.time = time || movie.time;
        movie.language = language || movie.language;
        movie.year = year || movie.year;
        movie.video = video || movie.video;
        movie.casts = casts || movie.casts;

        // Save updated movie
        const updatedMovie = await movie.save();

        res.status(200).json({ message: "Movie updated successfully", updatedMovie });
    } catch (error) {
        console.error(error); // Helpful for debugging
        res.status(400).json({ message: error.message });
    }
});

// Export all functions
export { 
    importMovies, 
    getMovies, 
    getMovieById, 
    getTopRatedMovies, 
    getRandomMovies, 
    createMovieReview, 
    updateMovie 
};
