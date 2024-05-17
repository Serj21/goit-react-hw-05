import { useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWE1MzlkNjYyYjVhNzI5Y2EzNGY0OGFmZGRiNmJkZiIsInN1YiI6IjY2NDVmNmE3ODJlMGM3NzIyNjJmMDE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.htUmrz8ihNDjhxRrZgFD2ASO85BALmh8KbZqJEhSZ1g",
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
