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

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]); // Список фильмов
  const [showForm, setShowForm] = useState(false); // Форма добавления фильма
  const [newMovie, setNewMovie] = useState({
    title: "",
    date: "",
    description: "",
    image: null,
    rating: 0,
  });

  // Получение списка фильмов с бекенда
  const fetchMovies = () => {
    axios
      .get("http://localhost:8000/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

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
    const formData = newMovie;
    axios
      .post("http://localhost:8000/movies", formData)
      .then(() => {
        fetchMovies(); // Обновляем список фильмов
        setShowForm(false);
        setNewMovie({
          title: "",
          date: "",
          description: "",
          image: null,
          rating: 0,
        });
      })
      .catch((error) => console.error("Error adding movie:", error));
  };

  // Удаление фильма
  const handleDeleteMovie = (id) => {
    axios
      .delete(`http://localhost:8000/movies/${id}`)
      .then(() => fetchMovies())
      .catch((error) => console.error("Error deleting movie:", error));
  };

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <span className="bold">Мои фильмы</span>
          <span className="divider">|</span>
          <span className="watch-later">Хочу посмотреть</span>
        </div>
        <button className="add-movie-btn" onClick={() => setShowForm(true)}>
          Добавить фильм
        </button>
      </header>

      <main className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={() => handleDeleteMovie(movie.id)}
          />
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
              <select
                name="rating"
                className="input-field"
                value={newMovie.rating}
                onChange={handleInputChange}
                required
              >
                <option value="0">Выберите рейтинг</option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <button type="submit" className="submit-btn">
                Добавить фильм
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                Закрыть
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
