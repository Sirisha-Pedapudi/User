import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "f44bdcae";

function App() {
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch('https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}');
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, []); // Only run once on initial load

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for movies..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;