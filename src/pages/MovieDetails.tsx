import { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { BsPlay } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import {
  AiOutlineDislike,
  AiOutlineHeart,
  AiOutlineLike,
} from "react-icons/Ai";
import { FiDelete } from "react-icons/Fi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ReactPlayer from "react-player";

import "./MovieDetails.css";
import { Favorite, Movie, User } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { port } from "../port";
type Props = {
  currentUser: User | null;
  logout: () => void;
  setFavorites: (val: Favorite[]) => void;
};
export default function MovieDetails({
  currentUser,
  logout,
  setFavorites,
}: Props) {
  let navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comment, setComment] = useState("");

  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:${port}/movie/${params.id}`)
      .then((resp) => resp.json())
      .then((singleMovie) => setMovie(singleMovie));
  }, []);

  return (
    <div className="movie-details">
      <header className="movie-details-header">
        <div>
          <Link to={"/MovieMasterHome"}>Movie Master</Link>
        </div>
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
            <div className="movie-details-current-user">
              <img src={currentUser.profilePic} alt="" height={50} />
              <span className="movie-details-current-user-span">
                {currentUser.username}
              </span>
            </div>
            <div>
              <span>
                <Link to={"/Favorites"}>Favorites</Link>
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
      </header>

      <main className="movie-details-main">
        <div className="movie-section">
          <h1>{movie?.title}</h1>
          <div className="movie-player">
            <iframe
              id="videoPlayer"
              width="100%"
              height="360"
              src={movie?.video}
              frameBorder="0"
            ></iframe>
          </div>
          <div className="movie-info">
            <h3>Genre:{movie?.genre}</h3>
            <h3>Duration:{movie?.duration} min</h3>
            <h3>Rating:{movie?.rating}/100</h3>
          </div>
          <div className="description">
            <p>{movie?.description}</p>
          </div>
        </div>
        <div className="review-section">
          <div className="reviews">
            <ul>
              {movie?.reviews?.map((review) => (
                <li className="single-review">
                  <div>
                    <img src={review.user?.profilePic} alt="" />
                    <span>{review.user?.username}</span>
                  </div>
                  <div className="review-comment">
                    <p>{review.comment}</p>
                    <button className="delete-button">
                      <IoIosRemoveCircleOutline />
                    </button>
                    <button>
                      <AiOutlineLike />
                    </button>
                    <button>
                      <AiOutlineDislike />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <form
            className="add-comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                userId: currentUser?.id,
                movieId: movie?.id,
                comment,
              };
              fetch(`http://localhost:${port}/addReviewToMovie`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((resp) => resp.json())
                .then((data) => {
                
                  if (data.error) {
                    alert(data.error);
                    console.log(data.error);
                  } else {
                    fetch(`http://localhost:${port}/movie/${params.id}`)
                      .then((resp) => resp.json())
                      .then((singleMovie) => setMovie(singleMovie) );
                  }
                });
            }}
          >
            {currentUser && (
              <>
                <label htmlFor="">
                  <input
                    type="text"
                    name="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </label>
                <button type="submit">comment</button>
              </>
            )}
          </form>
        </div>
      </main>
      <footer>
        Add to Favorites
        <button
          className="favorite-button"
          onClick={(e) => {
            e.preventDefault();
            const data = {
              userId: currentUser?.id,
              movieId: movie?.id,
            };
            fetch(`http://localhost:${port}/addMovieToFavorite`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((resp) => resp.json())
              .then((data) => {
                if (data.error) {
                  alert(data.error);
                  console.log(data.error);
                } else {
                  fetch(`http://localhost:${port}/favorites`)
                    .then((resp) => resp.json())
                    .then((favorites) => setFavorites(favorites));
                }
              });
          }}
        >
          ❤️
        </button>
      </footer>
    </div>
  );
}
