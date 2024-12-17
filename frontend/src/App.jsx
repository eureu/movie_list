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

import React, { useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";

function App() {
  const [movies, setMovies] = useState(
    Array(8).fill({
      title: "1+1",
      date: "12.08.24",
      description:
        "Очень неожиданный для меня сюжет, о многом заставляет задуматься...",
      rating: 10,
      image: "/movie-image.jpg",
    })
  );

  const [showForm, setShowForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    date: "",
    description: "",
    image: null,
  });

  // Открыть и закрыть форму
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  // Обновление полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMovie((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  // Добавление нового фильма
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (newMovie.title && newMovie.date && newMovie.description) {
      setMovies((prev) => [...prev, { ...newMovie, rating: 0 }]);
      setShowForm(false);
      setNewMovie({ title: "", date: "", description: "", image: null });
    }
  };

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <span className="bold">Мои фильмы</span>
          <span className="divider">|</span>
          <span className="watch-later">Хочу посмотреть</span>
          <div className="header-icons">
            <i className="icon sort-icon">⭳</i>
            <i className="icon filter-icon">🔍</i>
          </div>
        </div>
        <button className="add-movie-btn" onClick={handleOpenForm}>
          Добавить фильм
        </button>
      </header>

      <main className="grid">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </main>

      {/* Форма добавления фильма */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <form onSubmit={handleAddMovie}>
              <div className="photo-upload">
                <div className="dashed-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="upload-btn">
                    Загрузить фото
                  </label>
                </div>
                {newMovie.image && (
                  <img
                    src={newMovie.image}
                    alt="Preview"
                    className="preview-image"
                  />
                )}
              </div>
              <input
                type="text"
                name="title"
                placeholder="Название"
                className="input-field"
                value={newMovie.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                className="input-field"
                value={newMovie.date}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Описание..."
                className="textarea-field"
                value={newMovie.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn">
                Добавить фильм
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={handleCloseForm}
              >
                Закрыть
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
