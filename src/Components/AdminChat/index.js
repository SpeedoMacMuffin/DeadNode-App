import "./styles.css";
import FormSure from "../FormSure";
import { useState } from "react";
export default function AdminChat({ socket }) {
  const [message, setMessage] = useState("Delete All Messages");
  const deleteHandler = () => {
    socket.emit("delete");
    setMessage("Messages deleted!");
    setTimeout(() => {
      setMessage("Delete All Messages");
    }, 3000);
  };

  return (
    <div className="one flex center message">
      <div>
        <h1 className="center one flex">[Chat]</h1>

        <span className="stack">Users online:</span>
        <span className="stack">Messages:</span>
        <span className="stack">Stat:</span>
        <FormSure name="chat" onClick={deleteHandler} message={message} />
      </div>
    </div>
  );
}
