import { Favorite, User } from "../types";

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
      <div className="user-information">
        <h2>{currentUser.username}</h2>
        <img height={100} src={currentUser.profilePic} alt="" />
      </div>
      <div className="user-favorite-movies">
        <h2>{currentUser?.username}'s favorite movies:</h2>
        <ul>
          {favorites.map((favorite) =>
            favorite.movies.map((movie) => <li>{movie.title}</li>)
          )}
        </ul>
      </div>
    </div>
  );
}
