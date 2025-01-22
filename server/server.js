import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js"

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Main Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//other routes
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);




// Start the server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
