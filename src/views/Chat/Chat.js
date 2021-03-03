import { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import { Link } from "react-router-dom";
const SERVER = "http://127.0.0.1:8000";

const socket = socketClient(SERVER);

export default function Chat() {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("I am connected with the back-end!");
      console.log("My Socket-ID = " + socket.id);
    });

    socket.on("history", (msgArray) => {
      setMessages(msgArray);
    });

    socket.on("newMsg", ({ content, username }) => {
      const msg = {
        content,
        username,
      };
      setMessages((messages) => [...messages, msg]);
      console.log(content, username);
    });
  }, []);

  const submit = (event) => {
    let message = { content, username, date: Date() };
    event.preventDefault();
    socket.emit("newMessage", message);
    setMessages([...messages, message]);
    setContent("");
  };

  return (
    <div>
      <h1>Hello world</h1>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <form onSubmit={submit} id="form">
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          id="text"
        />

        <button id="submit" type="submit">
          Send
        </button>
      </form>
      <Link to="/files">Files</Link>

      {messages.map((iteration) => {
        return (
          <div>
            <span>{iteration.content}</span>
            <br></br>
            <span>{iteration.username}</span>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
