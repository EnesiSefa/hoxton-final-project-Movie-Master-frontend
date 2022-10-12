import { useEffect, useState } from "react";
import "./MoviePage.css";
export default function MoviePage() {
  const [movie, setMovie] = useState([]);
  useEffect(()=>{
    fetch("")
  },[])
  return (
    <div className="movie-page">
      <header></header>
      <main></main>
      <footer></footer>
    </div>
  );
}
