import { Movie, User } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";

type Props = {
  currentUser: User | null;
  logout: () => void;
  login: (data: any) => void;
};

export default function HomePage({ currentUser, logout }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4007/movies`)
      .then((resp) => resp.json())
      .then((movies) => setMovies(movies));
  }, []);
  return (
    <div className="home-page">
      <header className="header">
        <div>categories</div>
        <form>
          <label htmlFor="search">
            <input type="text" placeholder="search..." name="search" />
          </label>
        </form>
        {currentUser ? (
          <form
            onSubmit={() => {
              logout();
              
            }}
          >
            <button type="submit">Sign out </button>
          </form>
        ) : (
          <form
            onSubmit={() => {
              navigate("/SignIn");
            }}
          >
            <button type="submit">Sign in</button>
          </form>
        )}
      </header>
      <main className="main">
        <div className="video-section">
          <ul className="movie-list">
            {movies.map((movie) => (
              <li className="movie-item">
                <h4 className="movie-title">
                  {movie.title}
                  <p>({movie.year})</p>
                </h4>
                <Link to={"/WatchMovie"}>
                  <img
                    className="movie-thumbnail"
                    height={400}
                    src={movie.thumbnail}
                    alt="poster"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
