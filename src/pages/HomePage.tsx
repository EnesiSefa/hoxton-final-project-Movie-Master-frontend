import { Movie, User } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  currentUser: User | null;
  logout: () => void;
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
        <form
          onSubmit={() => {
            logout();
            navigate("/SignIn");
          }}
        >
          <button type="submit">Sign out </button>
        </form>
      </header>
      <main className="main">
        <div className="video-section">
          <ul className="movie-list">
            <li>{currentUser?.username}</li>
            {movies.map((movie) => (
              <li className="movie-item">
                <h3 className="movie-title">{movie.title}</h3>
                <video
                  className="movie-video"
                  width="320"
                  height="340"
                  controls
                  src={movie.video}
                ></video>
                <p className="movie-year">{movie.year}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
