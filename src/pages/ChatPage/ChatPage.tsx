import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User, Message } from "../../types";
import "./ChatPage.css";
import { BiSend } from "react-icons/bi";
import io from "socket.io-client";
import { port } from "../../port";

type Props = {
  currentUser: User | null;
  logout: () => void;
  receiver: User | null;
};
export default function ChatPage({ currentUser, logout, receiver }: Props) {
  let navigate = useNavigate();

  const [theme, setTheme] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  // const [socket, setSocket] = useState<any>(null);

  const params = useParams();

  console.log(messages);
useEffect(()=>{
  fetch(`http://localhost:${port}/messages`)
  .then((resp) => resp.json())
  .then((msg) => setMessages(msg));
},[])
  // useEffect(() => {
  //   const socket = io("ws://localhost:4555");
  //   setSocket(socket);
  //   console.log(socket);
  //   socket.on("message", (messages) => {
  //     setMessages(messages);
  //   });
  // }, []);
  if (!receiver) return <p>Loading</p>;

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
          <img src={receiver.profilePic} alt="" />
          <span>{receiver.username}</span>
        </div>
        <div className="conversation">
          {messages.map((msg) => (
            <span>{msg.content}</span>
          ))}

          <span>{receiver.receivedMessages}</span>
        </div>
        <div className="sender-form">
          <form
            className="send-message"
            onSubmit={(e) => {
              e.preventDefault();
              if (e.target.text.value) {
                e.preventDefault();
                const data = {
                  content: e.target.text.value,
                  senderId: currentUser?.id,
                  receiverId: receiver.id,
                };
                fetch(`http://localhost:${port}/message`, {
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
                      fetch(`http://localhost:${port}/messages`)
                        .then((resp) => resp.json())
                        .then((msg) => setMessages(msg));
                    }
                  });
                e.target.text.value = "";
              }
            }}
          >
            <input name="text" placeholder="Send a message here...." />
            <button type="submit">
              <BiSend className="sent-icon" />
            </button>
          </form>
          <img height={50} src={currentUser?.profilePic} alt="" />
        </div>
      </main>
    </div>
  );
}
