import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Main Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Other routes
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
