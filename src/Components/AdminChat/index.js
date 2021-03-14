import "./styles.css";
import FormSure from "../FormSure";
import Api from "../../Api/fileAPI";
import { useState, useEffect } from "react";
export default function AdminChat({ socket, messages }) {
  const [message, setMessage] = useState("Delete All Messages");

  const deleteHandler = () => {
    socket.emit("delete");
    setMessage("Messages deleted!");
    setTimeout(() => {
      setMessage("Delete All Messages");
    }, 3000);
  };
  // useEffect(() => {
  //   socket.emit("room", { room: "admin" });
  //   socket.on("loadNewFile", async () => {
  //     try {
  //       const res = await Api.get("/local");
  //       setFiles(res.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  //   socket.on("history", (msgArray) => {
  //     setMessages((messages) => [...messages, msgArray]);
  //   });
  // });
  // console.log(messages);

  return (
    <div className="flex center message">
      <div>
        <h1 className="center flex">[Chat]</h1>

        <span className="stack">Users online: </span>
        <span className="stack">Messages: {messages}</span>
        <span className="stack">Stat:</span>
        <FormSure name="chat" onClick={deleteHandler} message={message} />
      </div>
    </div>
  );
}
