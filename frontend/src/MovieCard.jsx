import React from "react";

function MovieCard({ title, date, description, rating, image }) {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={image} alt={title} />
        <span className="rating">{rating}</span>
      </div>
      <div className="movie-info">
        <h2>{title}</h2>
        <p className="date">{date}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
