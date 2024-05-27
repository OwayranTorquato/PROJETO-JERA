import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaPlus } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const [liked, setLiked] = useState(false);
  const [addedToList, setAddedToList] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddToList = () => {
    setAddedToList(!addedToList);
  };

  return (
    <div className="movie-card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      <div className="buttons">
        <button onClick={handleLike}>
          <FaHeart color={liked ? "red" : "gray"} />
        </button>
        <button onClick={handleAddToList}>
          <FaPlus color={addedToList ? "green" : "gray"} />
        </button>
      </div>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
