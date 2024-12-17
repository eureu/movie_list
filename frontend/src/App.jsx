// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const MovieCard = ({ movie }) => (
//   <div className="movie-card">
//     <img src={movie.image} alt={movie.title} className="movie-image" />
//     <div className="movie-info">
//       <h3>{movie.title}</h3>
//       <p>{movie.date}</p>
//       <p className="description">{movie.description}</p>
//       <p className="genres">{movie.genres.join(" ")}</p>
//     </div>
//     <div className="movie-rating">{movie.rating}</div>
//   </div>
// );

// const AddMovieForm = ({ onClose }) => (
//   <div className="modal">
//     <div className="modal-content">
//       <span className="close" onClick={onClose}>
//         &times;
//       </span>
//       <input type="text" placeholder="Название" />
//       <input type="text" placeholder="12.10.2024" />
//       <textarea placeholder="Описание..."></textarea>
//       <button>Добавить фильм</button>
//     </div>
//   </div>
// );

// const App = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/movies")
//       .then((response) => setMovies(response.data))
//       .catch((error) => console.error("Error fetching movies:", error));
//   }, []);

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Мои фильмы</h1>
//         <button className="add-movie" onClick={() => setShowForm(true)}>
//           Добавить фильм
//         </button>
//       </header>
//       {showForm && <AddMovieForm onClose={() => setShowForm(false)} />}
//       <div className="movie-grid">
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

import React from "react";
import "./App.css";
import MovieCard from "./MovieCard";

function App() {
  const movies = Array(8).fill({
    title: "1+1",
    date: "12.08.24",
    description:
      "Очень неожиданный для меня сюжет, о многом заставляет задуматься...",
    rating: 10,
    image: "/movie-image.jpg", // замените на ваш путь к изображению
  });

  return (
    <div className="container">
      <header>
        <h1>Мои фильмы</h1>
        <button className="add-movie-btn">Добавить фильм</button>
      </header>
      <main className="grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </main>
    </div>
  );
}

export default App;
