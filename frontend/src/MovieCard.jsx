import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onDelete }) => (
  <div className="movie-card">
    {movie.image && (
      <img src={movie.image} alt={movie.title} className="movie-image" />
    )}
    <div className="movie-info">
      <h3>{movie.title}</h3>
      <p>{movie.date}</p>
      <p className="description">{movie.description}</p>
    </div>
    <div className="movie-rating">{movie.rating}</div>
    <button className="delete-btn" onClick={onDelete}>
      Удалить
    </button>
  </div>
);

export default MovieCard;
