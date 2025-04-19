import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const { data } = await axios.get(`/api/movies/${id}`);
                setMovie(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
                setError('Unable to load movie details. Please try again later.');
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    if (!movie) {
        return <p className="text-center mt-4">Loading movie details...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2">{movie?.name || 'Untitled Movie'}</h1>
            <img 
                src={movie?.image || 'https://via.placeholder.com/400x300?text=No+Image+Available'} 
                alt={movie?.name || 'Movie poster'} 
                className="w-full h-80 object-cover rounded-md mb-4" 
            />
            <p>{movie?.desc || 'No description available.'}</p>
            <p className="mt-2">Rating: {movie?.rate ?? 'N/A'}/5</p>
        </div>
    );
};

export default MovieDetails;

