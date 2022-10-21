import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { User, Message } from "../../types";
import "./ChatPage.css";
import { BiSend } from "react-icons/bi";
import io from "socket.io-client";
import { port } from "../../port";
import { useStore } from "../../zustand/store";
import { IoIosRemoveCircleOutline } from "react-icons/io";
type Props = {
  logout: () => void;
  validate: () => void;
};
export default function ChatPage({ logout, validate }: Props) {
  const {
    currentUser,
    theme,
    setTheme,
    saveReceiver,
    setSaveReceiver,
    saveSender,
    setSaveSender,
  } = useStore();

  let navigate = useNavigate();
  const params = useParams();

  async function getUser(id: number) {
    await fetch(`http://localhost:${port}/user/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setSaveSender(data);
        }
      });
  }

  useEffect(() => {
    //@ts-ignore
    const user: User | null = JSON.parse(localStorage.getItem("user"));

    getUser(user.id);
  }, []);
  useEffect(() => {
    fetch(`http://localhost:${port}/user/${params.receiverId}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setSaveReceiver(data);
        }
      });
  }, [params.receiverId]);

  if (!saveReceiver)
    return (
      <div className="loading">
        <img
          className="loading-image"
          src="https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif"
          alt=""
        />
      </div>
    );

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
                navigate("/MovieMasterHome")
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
        <div >
          <label  htmlFor="checkbox">
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
          <img src={saveReceiver.profilePic} height={50} alt="" />
          <span>{saveReceiver.username}</span>
        </div>
        <div className="conversation">
          <ul className="sender-message-list">
            {saveSender?.sentMessages.map((msg) => (
              <li className="sender-messages">
                <img height={15} src={saveSender.profilePic} alt="" />
                <span>{msg.content}</span>
                <button
                  className="delete-button-chat"
                  onClick={(e) => {
                    e.preventDefault();
                    fetch(`http://localhost:${port}/message/${msg.id}`, {
                      method: "DELETE",
                    }).then((res) => res.json());
                  }}
                >
                  <IoIosRemoveCircleOutline />
                </button>
              </li>
            ))}
          </ul>

          <ul className="receiver-message-list">
            {saveReceiver.sentMessages.map((msg) => (
              <li className="receiver-messages">
                <span>{msg.content}</span>
                <img height={15} src={saveReceiver.profilePic} alt="" />
              </li>
            ))}
          </ul>
        </div>
        <div className="send-message-div">
          <form
            className="send-message-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (e.target.text.value) {
                e.preventDefault();
                const data = {
                  content: e.target.text.value,
                  senderId: currentUser?.id,
                  receiverId: saveReceiver.id,
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
                      getUser(data.senderId);
                    }
                  });
                e.target.text.value = "";
              }
            }}
          >
            <input className="message-input" name="text" placeholder="Send a message here...." />
            <button className="button-message" type="submit">
              <BiSend className="sent-icon" />
            </button>
          </form>
        </div>
      </main>
      <footer>footer</footer>
    </div>
  );
}
