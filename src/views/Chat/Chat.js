import { useState, useEffect } from "react";
// import socketClient from "socket.io-client";
import { Link } from "react-router-dom";
// const SERVER = "http://127.0.0.1:8000";

// const socket = socketClient(SERVER);

export default function Chat({ room, socket }) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [messages, setMessages] = useState([]);
  const [inRoom, setInRoom] = useState({ room });

  useEffect(() => {
    socket.on("history", (msgArray) => {
      setMessages(msgArray);
    });

    socket.on("receiveNewMessage", ({ content, username }) => {
      const msg = {
        content,
        username,
      };
      setMessages((messages) => [...messages, msg]);
    });
  }, []);
  useEffect(() => {
    console.log("joining room");
    socket.emit("room", { room: "chat-room" });
    socket.emit("history");

    return () => {
      if (room) {
        console.log("leaving room");
        socket.emit("leave room", {
          room: "chat-room",
        });
      }
    };
  }, [room]);
  const submit = (event) => {
    let message = { content, username, date: Date() };
    event.preventDefault();
    socket.emit("newMessage", message);
    setMessages([...messages, message]);
    setContent("");
  };

  return (
    <div>
      <span></span>
      <h1>Hello {username}</h1>
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
            <span>{iteration.username}</span>
            <br></br>
            <span>{iteration.content}</span>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
