import "./styles.css";
import Api from "../../Api/fileAPI";
import { useState, useEffect } from "react";
import AdminChat from "../../Components/AdminChat";
import AdminFiles from "../../Components/AdminFiles";
import AdminPi from "../../Components/AdminPi";

export default function Admin({ socket, room, setRoom }) {
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState("");

  useEffect(() => {
    if (room !== "admin") {
      socket.emit("leaving room", { room });
      setRoom("admin");
      socket.emit("room", { room: "admin" });
    }
    socket.on("loadNewFile", (fileName) => {
      setFiles((files) => [...files, fileName]);
    });

    // socket.emit("admin");
    // socket.on("admin", (res) => {
    //   setMessages(res);
    // });
    socket.emit("admin-stats");
    socket.on("admin-stats", (stats) => {
      setClients(stats);
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

  return (
    <div className="admin-view">
      <div>
        <h1>Admin View</h1>
      </div>
      <div>
        <AdminChat socket={socket} messages={messages} />
        <AdminFiles files={files} socket={socket} />
      </div>
      <AdminPi clients={clients} />
    </div>
  );
}
