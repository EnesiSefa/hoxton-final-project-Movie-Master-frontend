import { useEffect } from "react";
import { Link } from "react-router-dom";

import { port } from "../port";
import { Favorite, User } from "../types";
import { useStore } from "../zustand/store";
import "./FavoritePage.css";

export default function FavoritePage() {
  const { currentUser, setFavorites, favorites } = useStore();
  useEffect(() => {
    fetch(`http://localhost:${port}/favorites`)
      .then((resp) => resp.json())
      .then((favs) => setFavorites(favs));
  }, []);
  if (!currentUser) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="favorite-page">
      <header className="favorite-page-header">
        <Link to="/MovieMasterHome">
          <p>Movie Master</p>
        </Link>
      </header>
      <main className="favorite-page-main">
        <div className="user-information">
          <h2>{currentUser.username}</h2>
          <img height={100} src={currentUser.profilePic} alt="" />
        </div>
        <div className="user-favorite-movies">
          <ul className="user-favorite-movie-list">
            {favorites.map((favorite) =>
              favorite.movies?.map((movie) => (
                <li className="user-favorite-movie-item">
                  <img src={movie.thumbnail} alt="" height={200} />
                  <h3>{movie.title}</h3>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
      <footer>Copyright@ 2022 MovieMaster All rights reserved</footer>
    </div>
  );
}
