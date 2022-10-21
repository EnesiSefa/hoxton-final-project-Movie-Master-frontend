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
import { Favorite, Message, Movie, User } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { port } from "../port";
import { useStore } from "../zustand/store";

type Props = {
  logout: () => void;
};
export default function MovieDetails({ logout }: Props) {
  let navigate = useNavigate();

  const {
    movie,
    setMovie,
    comment,
    setComment,
    theme,
    setTheme,
    currentUser,
    setFavorites,
    setReceiver,
  } = useStore();

  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:${port}/movie/${params.id}`)
      .then((resp) => resp.json())
      .then((singleMovie) => setMovie(singleMovie));
  }, []);

  return (
    <div className={theme ? "movie-details-dark" : "movie-details"}>
      <header className="movie-details-header">
        <div>
          <Link to={"/MovieMasterHome"}>Movie Master</Link>
        </div>
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
        <div>
          <label htmlFor="checkbox-id">
            {theme ? (
              <img
                height={30}
                src="https://cdn-icons-png.flaticon.com/512/4892/4892988.png"
                alt=""
              />
            ) : (
              <img
                height={30}
                src="https://cdn4.iconfinder.com/data/icons/multimedia-flat-30px/30/sun_light_mode_day-512.png"
                alt=""
              />
            )}
            <input
              type="checkbox"
              id="checkbox-id"
              style={{ opacity: 0 }}
              checked={false}
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

      <main className="movie-details-main">
        <div className="movie-section">
          <h1>{movie?.title}</h1>
          <div className="movie-player">
            <iframe
              id="videoPlayer"
              width="100%"
              allowFullScreen={true}
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
            <ul className="review-list">
              {movie?.reviews?.map((review) => (
                <li className="single-review">
                  <div
                    className="single-review-user"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentUser) {
                        console.log("this is receiver", review.user);
                        fetch(`http://localhost:${port}/user/${review.userId}`)
                          .then((resp) => resp.json())
                          .then((user) => {
                            setReceiver(user);
                            navigate(`/Chat/${review.userId}`);
                          });
                      }
                    }}
                  >
                    <img src={review.user?.profilePic} height={40} alt="" />
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
          {/* this form allows the User to add a Review to the Movie */}
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
                      .then((singleMovie) => setMovie(singleMovie));
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
        {/* this form button allows the User to add a Movie to his the Favorite playlist */}
        {currentUser && (
          <>
            <p>Add to favorites</p>
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
          </>
        )}
      </footer>
    </div>
  );
}
