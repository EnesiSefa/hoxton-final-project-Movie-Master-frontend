import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage/ChatPage";
import FavoritePage from "./pages/FavoritePage";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { port } from "./port";
import { useStore } from "../src/zustand/store";

function App() {
  const { setCurrentUser } = useStore();

  function login(data: any) {
    console.log(2);
    setCurrentUser(data.user);
    localStorage.token = data.token;
    localStorage.user = JSON.stringify(data.user);
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
  }

  async function validate() {
    if (localStorage.token) {
      await fetch(`http://localhost:${port}/validate`, {
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
  }
  useEffect(() => {
    validate();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/MovieMasterHome" />} />
        <Route path="/MovieMasterHome" element={<HomePage logout={logout} />} />
        <Route path="/movie/:id" element={<MovieDetails logout={logout} />} />
        <Route path="/SignIn" element={<SignInPage login={login} />} />
        <Route path="/SignUp" element={<SignUpPage login={login} />} />
        <Route path="/Favorites" element={<FavoritePage />} />
        <Route
          path="/Chat/:receiverId" // this saves the receiver in chat
          element={<ChatPage logout={logout} validate={validate} />}
        />
      </Routes>
    </div>
  );
}

export default App;
