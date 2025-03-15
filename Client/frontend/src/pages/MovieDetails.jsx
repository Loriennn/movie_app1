import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const { data } = await axios.get(`/api/movies/${id}`);
                setMovie(data);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
            <img src={movie.image} alt={movie.name} className="w-full h-80 object-cover rounded-md mb-4" />
            <p>{movie.desc}</p>
            <p className="mt-2">Rating: {movie.rate}/5</p>
        </div>
    );
};

export default MovieDetails;
