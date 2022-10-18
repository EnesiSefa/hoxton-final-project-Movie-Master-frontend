import { Link } from "react-router-dom";
import { Favorite, User } from "../types";
import "./FavoritePage.css";

type Props = {
  currentUser: User | null;
  favorites: Favorite[];
};
export default function FavoritePage({ currentUser, favorites }: Props) {
  if (!currentUser) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="favorite-page">
      <header className="favorite-page-header">
        <Link to="/MovieMasterHome"><p>Movie Master</p></Link>

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
      <footer>footer</footer>
    </div>
  );
}
