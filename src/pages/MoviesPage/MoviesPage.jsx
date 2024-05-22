import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWE1MzlkNjYyYjVhNzI5Y2EzNGY0OGFmZGRiNmJkZiIsInN1YiI6IjY2NDVmNmE3ODJlMGM3NzIyNjJmMDE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.htUmrz8ihNDjhxRrZgFD2ASO85BALmh8KbZqJEhSZ1g",
              },
            }
          );
          setSearchResults(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSearchChange = (e) => {
    setSearchParams({ query: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Enter movie title..."
          style={{ marginRight: "20px" }}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
