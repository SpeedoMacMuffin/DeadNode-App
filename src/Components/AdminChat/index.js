import "./styles.css";
import FormSure from "../FormSure";
import { useState } from "react";

export default function AdminChat({ socket, messages, setMessages }) {
  const [message, setMessage] = useState("Delete All Messages");

  const deleteHandler = () => {
    if (messages > 0) {
      socket.emit("deleteMessages");
      setMessage("Messages deleted!");
      setTimeout(() => {
        setMessage("Delete All Messages");
        setMessages(0);
      }, 3000);
    } else {
      setMessage("Messages already empty");
      setTimeout(() => {
        setMessage("Delete All Messages");
      }, 3000);
    }
  };

  return (
    <div className="flex message stats">
      <div>
        <h2 className="center flex">[Chat]</h2>

        <span className="stack">Messages: {messages}</span>

        <FormSure name="chat" onClick={deleteHandler} message={message} />
      </div>
    </div>
  );
}
