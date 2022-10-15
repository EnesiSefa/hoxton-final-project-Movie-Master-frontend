import { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { BsPlay } from "react-icons/bs";
import ReactPlayer from "react-player";

import "./MovieDetails.css";
import { Movie, User } from "../types";
import { useParams } from "react-router-dom";
type Props = {
  currentUser: User | null;
};
export default function MoviePage({ currentUser }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comment, setComment] = useState("");
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:4007/movie/${params.id}`)
      .then((resp) => resp.json())
      .then((singleMovie) => setMovie(singleMovie));
  }, []);
  return (
    <div className="movie-details">
      <header>
        <h1>{movie?.title}</h1>
      </header>
      <main>
        <div className="movie-player">
          <ReactPlayer controls={true} url={movie?.video}></ReactPlayer>
        </div>
        <div className="movie-info">
          <h3>Genre:{movie?.genre}</h3>
          <h3>Duration:{movie?.duration} min</h3>
          <h3>Rating:{movie?.rating}/100</h3>
        </div>
        <div className="description">{/* <p>{movie?.description}</p> */}</div>
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
            fetch(`http://localhost:4007/addReviewToMovie`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((resp) => resp.json())
              .then((data) => {
                // data = {user,token}
                if (data.error) {
                  alert(data.error);
                  console.log(data.error);
                } else {
                  fetch(`http://localhost:4007/movie/${params.id}`)
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
      </main>
      <footer></footer>
    </div>
  );
}
