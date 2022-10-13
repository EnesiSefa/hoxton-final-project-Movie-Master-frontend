import { useEffect, useState } from "react";
import "./MovieDetails.css";
export default function MoviePage() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch("");
  }, []);
  return (
    <div className="movie-page">
      <header></header>
      <main>
        <div className="movie-player">
           <video src=""></video>
           <button></button>
           <input type="range" name="" id="" />

        </div>
        <div className="reviews"></div>
      </main>
      <footer></footer>
    </div>
  );
}
