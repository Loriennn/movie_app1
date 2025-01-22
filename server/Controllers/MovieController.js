import { MoviesData} from "../ Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler;"


// **public controllers
// import movies
// Route POST/api/movies/import
// public


const importMovies= asyncHandler ( async (req, res) =>{
      
 // get all movies 
 // route  Get /api/movies
 // Public

 const getMovies = asyncHandler ( async (req, res) =>) {
        try {

            //filer movies by category, times, language, rate, year and search
            const { category, time, language, rate, year, search} = req.query;
            let query ={
                ...( category && {category}),
                ... ( time && {time}),
                ...(language && { language}),
                ...(rate && {rate}),
                ...( year && { year}),
                ...(search && { name: { $regex: search, $option : "i"}}),

            }

            // load more movies functionality

            const page = Number ( req.query.pageNumber) ||1;
            const limit = 2; // 2 movies per page
            const skip = ( page -1) * limit ; //skip 2 movies per page

            // find movies by querying and skipping and limiting 

           const movies = await Movie.find(query).skip(skip).limit(limit);
            .sort( { createdAt: -1})
            .skip (skip)
            .limit( limit);

            //get total number of movies
            const count = await Movie.countDocuments( query);

            //send response with movies and total number of movies

            res.json ({
                movies, 
                page,
                pages: Math.cell( count / limit), //total number of pages
                totalMovies: count,
    
            });

        } catch (error) {

            res.status(400).json ({ message :error.message});

        }

        const getMovieById = asyncHandler ( async (req, res)=>{
            try {
                //find movie by id in database
            
                const movie = await Movie.findById( req, params.id);

                // if the movie found, send 404 error

                else {
                    res.status (404);
                    throw new Error ( "Movie not found");
                }

                // Get top rated movies
                // Get /api/movies/rated/top
                // access Public

                const getTopRatedMovies = asyncHandler ( async (req, res) => {
                    try {
                        // find top rated movies
                        const movies = await Movie.find( {}). sort ({rated: -1})
                    }
                })
            }
        })
 }

 export { importMovies, getMovies};