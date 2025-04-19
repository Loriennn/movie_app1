import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const {
    _id,
    name = "Untitled Movie",
    category = "Unknown",
    rate = "N/A",
    image
  } = movie;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-sm text-gray-400 mb-1">Category: {category}</p>
      <p className="text-yellow-400 mb-2">⭐ {rate} / 10</p>

      <Link
        to={`/movie/${_id}`}
        className="mt-auto text-blue-400 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
