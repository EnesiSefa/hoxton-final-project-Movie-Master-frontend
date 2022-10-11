import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import { User } from "./types";

export const port = 4007;
function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  function login(data: any) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
    console.log(currentUser)
  }
  function logout() {
    setCurrentUser(null);
    localStorage.clear()
    
  }
  
  return (
    <div className="App">
      <Routes>
        <Route
          path="/MovieMasterHome"
          element={<HomePage currentUser={currentUser} logout={logout}/>}
        />
        <Route index element={<Navigate replace to="/SignIn" />} />
        <Route path="/SignIn" element={<SignIn login={login} />} />
      </Routes>
    </div>
  );
}

export default App;
