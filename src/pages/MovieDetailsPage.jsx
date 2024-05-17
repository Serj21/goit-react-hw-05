import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const previousLocation = location.state?.from || "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWE1MzlkNjYyYjVhNzI5Y2EzNGY0OGFmZGRiNmJkZiIsInN1YiI6IjY2NDVmNmE3ODJlMGM3NzIyNjJmMDE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.htUmrz8ihNDjhxRrZgFD2ASO85BALmh8KbZqJEhSZ1g",
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={previousLocation}>Go back</Link>
      <h1>{movieDetails.title}</h1>
      {movieDetails.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
          alt={`${movieDetails.title} poster`}
        />
      )}
      <p>
        <strong>Rating:</strong> {movieDetails.vote_average}
      </p>
      <p>
        <strong>Genre:</strong>{" "}
        {movieDetails.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Overview:</strong> {movieDetails.overview}
      </p>

      <div>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
