import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types";
import "./ChatPage.css";
type Props = {
  currentUser: User | null;
  logout: () => void;
};
export default function ChatPage({ currentUser, logout }: Props) {
  let navigate = useNavigate();
  const [theme, setTheme] = useState(false);
  return (
    <div className="chat-page">
      <header className="chat-page-header">
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
            <div className="chat-page-current-user">
              <img src={currentUser.profilePic} alt="" height={50} />
              <span className="chat-page-current-user-span">
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
          <label htmlFor="checkbox">
            {theme ? (
              <p style={{ color: "white" }}>Light mode</p>
            ) : (
              <p>Dark mode</p>
            )}
            <input
              type="checkbox"
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
      <main className="chat-page-main">
        <div className="receiver-info">
          <img src="" alt="" />
          <span>bbbbbbbbbbbbb</span>
        </div>
        <div className="conversation">aaaaaaaaaaaa</div>
        <div className="sender-form">
          <form action="">
            <input type="text" value="" />
            <button type="submit">send</button>
          </form>
        </div>
      </main>
    </div>
  );
}
