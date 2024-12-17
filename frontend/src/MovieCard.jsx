import React from "react";
import "./MovieCard.css";

function MovieCard({ title, date, description, rating, image, onDelete }) {
  return (
    <div className="movie-card">
      <div className="movie-image">
        {image && <img src={image} alt={title} />}
        <span className="rating">{rating}</span>
      </div>
      <div className="movie-info">
        <h2>{title}</h2>
        <p className="date">{date}</p>
        <p className="description">{description}</p>
      </div>
      <button className="delete-btn" onClick={onDelete}>
        Удалить
      </button>
    </div>
  );
}

export default MovieCard;
