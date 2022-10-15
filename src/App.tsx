import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import { Movie, User } from "./types";

export const port = 4007;
function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
 
  function login(data: any) {
    console.log(2);
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }
  function logout() {
    setCurrentUser(null);
    localStorage.clear();
  }

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:4007/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            login(data);
            console.log(1);
          }
        });
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4007/movies/1`)
      .then((resp) => resp.json())
      .then((movies) => setMovies(movies));
  }, []);
  
    
  

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/MovieMasterHome" />} />
        <Route
          path="/MovieMasterHome"
          element={
            <HomePage
              currentUser={currentUser}
              logout={logout}
              login={login}
              movies={movies}
              
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetails currentUser={currentUser}/>} />
        <Route path="/SignIn" element={<SignInPage login={login} />} />
        <Route path="/SignUp" element={<SignUpPage login={login} />} />
      </Routes>
    </div>
  );
}

export default App;
