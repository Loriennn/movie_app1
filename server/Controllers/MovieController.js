import { MovieData} from "../ Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler;"


// **public controllers
// import movies
// Route POST/api/movies/import
// public


const importMovies= asyncHandler ( async (req, res) =>{
      
    // make sure the website table is empty by deleting all documents
    await Movies.deleteMany ({});
    // then we insert all movies from MovieData
const movies = await Movies.insertMany( MoviesData);
res.status(201).json(movies);

});

export { importMovies}