import { Movie, User } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { useStore } from "../zustand/store";
import { port } from "../port";
import ReactPaginate from "react-paginate";
type Props = {
  logout: () => void;
};

export default function HomePage({ logout }: Props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [count, setCount] = useState(0);
  const params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:${port}/movieCount`)
      .then((resp) => resp.json())
      .then((movies) => setCount(movies.movies));
    if (params.page === undefined) {
      fetch(`http://localhost:${port}/movies/1`)
        .then((resp) => resp.json())
        .then((movies) => setMovies(movies));
    } else {
      fetch(`http://localhost:${port}/movies/${params.page}`)
        .then((resp) => resp.json())
        .then((movies) => setMovies(movies));
    }
  }, [params.page]);

  function handleChangingPageNumber(selected: any) {
    setPageNumber(selected);
  }
  const changePage = ({ selected }: any) => {
    handleChangingPageNumber(selected);
    navigate(`/MovieMasterHome/page/${selected + 1}`);
  };

  const { currentUser, movies, setMovies, theme, setTheme } = useStore();
  let pageCount;
  console.log(count);
  pageCount = Math.ceil(count / 1); // items per page

  return (
    <div className={theme ? "home-page-dark" : "home-page"}>
      <h1 className={theme ? "movie-master-dark" : "movie-master"}>
        Movie Master
      </h1>
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
        <div>
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </main>
      <footer className="footer">
        Copyright@ 2022 MovieMaster All rights reserved
      </footer>
    </div>
  );
}
