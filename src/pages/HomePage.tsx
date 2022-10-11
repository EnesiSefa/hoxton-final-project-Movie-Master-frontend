import { User } from "../types";
import { useNavigate } from "react-router-dom";

type Props = {
  currentUser: User | null;
  logout: () => void;
};

export default function HomePage({ currentUser, logout }: Props) {
  let navigate = useNavigate();
  return (
    <>
      <h1>Movie Master</h1>
      <header className="header">
        <form>
          <label htmlFor="search">
            <input type="text" placeholder="search..." name="search" />
          </label>
        </form>
        <form
          action=""
          onSubmit={() => {
            logout;
            navigate("/SignIn");
          }}
        >
          <button>Sign out </button>
        </form>
      </header>
      <main className="main">
        <div>
          <ul>
            <li>{currentUser?.username}</li>
            <li>movie1</li>
            <li>movie1</li>
            <li>movie1</li>
          </ul>
        </div>
      </main>
      <footer className="footer"></footer>
    </>
  );
}
