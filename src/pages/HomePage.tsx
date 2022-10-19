import { Movie, User } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";

type Props = {
  currentUser: User | null;
  logout: () => void;
  login: (data: any) => void;
  movies: Movie[];
};

export default function HomePage({ currentUser, logout, movies }: Props) {
  let navigate = useNavigate();
  const [theme, setTheme] = useState(false);
  return (
    <div className={theme ? "home-page-dark" : "home-page"}>
      <h1 className={theme? "movie-master-dark":"movie-master"}>Movie Master</h1>
      <header className="header">
        <form>
          <label htmlFor="search">
            <input type="text" placeholder="search..." name="search" />
          </label>
        </form>
        {currentUser ? (
          <>
            <form
              onSubmit={() => {
                logout();
              }}
            >
              <button type="submit">Sign out </button>
            </form>
            <div className="home-page-current-user">
              <Link to={"/Favorites"}>
                <img src={currentUser.profilePic} alt="" height={50} />
              </Link>
              <span
                className={
                  theme
                    ? "home-page-current-user-span-dark"
                    : "home-page-current-user-span"
                }
              >
                {currentUser.username}
              </span>
            </div>
          </>
        ) : (
          <form
            onSubmit={() => {
              navigate("/SignIn");
            }}
          >
            <button type="submit">Sign in</button>
          </form>
        )}
        <div>
          <label htmlFor="checkbox">
            {theme ? (
              <p style={{ color: "white" }}>Light mode</p>
            ) : (
              <p>Dark mode</p>
            )}
            <input
              name="checkbox"
              type="checkbox"
              onChange={() => {
                if (theme) {
                  setTheme(false);
                } else {
                  setTheme(true);
                }
              }}
            />
          </label>
        </div>
      </header>
      <main className="main">
        <div className="video-section">
          <ul className="movie-list">
            {movies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <h4 className={theme ? "movie-title-dark" : "movie-title"}>
                  {movie.title}
                </h4>
                <p style={{ color: "red" }}>({movie.year})</p>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className={
                      theme ? "movie-thumbnail-dark" : "movie-thumbnail"
                    }
                    height={300}
                    src={movie.thumbnail}
                    alt="poster"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="footer">Copyright@ 2022 MovieMaster All rights reserved</footer>
    </div>
  );
}
