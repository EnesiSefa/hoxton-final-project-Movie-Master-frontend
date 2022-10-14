import { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { BsPlay } from "react-icons/bs";
import ReactPlayer from "react-player";

import "./MovieDetails.css";
import { Movie } from "../types";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movie, setMovie] = useState<Movie | null>(null);
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
        <form action="" className="add-comment-form">
          <label htmlFor="">
            <input type="text" name="comment" />
          </label>
          <button type="submit">comment</button>
        </form>
      </main>
      <footer></footer>
    </div>
  );
}
