import { useState, useEffect } from "react";
import ChatList from "../../Components/ChatList";
import "./styles.css";

export default function Chat({ room, username, socket }) {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState(false);
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
  }, []);

  const submit = (event) => {
    if (content.replace(/\s/g, "") == "") {
      event.preventDefault();
      setContent("");
    } else {
      const message = { content, username };
      event.preventDefault();
      socket.emit("newMessage", message);
      setMessages([...messages, message]);
      setNewMsg(true);
      setContent("");
    }
  };

  return (
    <div className="chat-view one">
      <ChatList list={messages} newMsg={newMsg} />

      <form onSubmit={submit} id="form" className="send-form">
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          id="text"
          placeholder="Enter Message..."
          className="four-fifth message-input"
          required
        />

        <button id="submit" type="submit" className="fifth send-button">
          Send
        </button>
      </form>
    </div>
  );
}
