import "./styles.css";
import Api from "../../Api/fileAPI";
import { useState, useEffect } from "react";
import AdminChat from "../../Components/AdminChat";
import AdminFiles from "../../Components/AdminFiles";
import AdminPi from "../../Components/AdminPi";

export default function Admin({ socket, room, setRoom, admin, setAdmin }) {
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState("");

  useEffect(() => {
    if (room !== "admin") {
      socket.emit("leaving room", { room });
      setRoom("admin");
      socket.emit("room", { room: "admin" });
    }
    socket.on("chatadmin", (res) => {
      setMessages(res);
      console.log(messages);
    });
    socket.emit("clients");
    socket.on("clients", (clients) => {
      setClients(clients);
    });
    socket.on("newFile", (fileName) => {
      setFiles((files) => [...files, fileName]);
      console.log(files);
    });
  }, []);
  useEffect(async () => {
    try {
      const res = await Api.get("/local");
      setFiles(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  // useEffect(() => {
  //   socket.on("newFile", (fileName) => {
  //     setFiles((files) => [...files, fileName]);
  //     console.log(files);
  //   });
  // }, []);

  return (
    <div className="admin-view">
      <AdminChat
        socket={socket}
        setMessages={setMessages}
        messages={messages}
      />
      <AdminFiles files={files} setFiles={setFiles} socket={socket} />

      <AdminPi clients={clients} admin={admin} setAdmin={setAdmin} />
    </div>
  );
}
