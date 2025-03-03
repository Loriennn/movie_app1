import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{movie.name}</h2>
      <p className="text-sm text-gray-400">Category: {movie.category}</p>
      <p className="text-yellow-400">⭐ {movie.rate} / 10</p>
      <Link to={`/movie/${movie._id}`} className="text-blue-400">
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
