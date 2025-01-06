import mongoose from 'mongoose';

// Function to connect to the database
export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;  // Get the MongoDB URI from the environment variable
        console.log("Mongo URI:", mongoURI);     // Debug log to check if it's loaded correctly

        const connect = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Database connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
