import "./styles.css";
import Api from "../../Api/fileAPI";
import { useState, useEffect } from "react";
import AdminChat from "../../Components/AdminChat";
import AdminFiles from "../../Components/AdminFiles";
import AdminPi from "../../Components/AdminPi";

export default function Admin({ socket }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    socket.on("loadNewFile", async () => {
      try {
        const res = await Api.get("/local");
        setFiles(res.data.data);
      } catch (err) {
        console.log(err);
      }
    });
  });
  useEffect(async () => {
    try {
      const res = await Api.get("/local");
      setFiles(res.data.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(files);
  return (
    <div className="admin-view">
      <div>
        <h1>Admin View</h1>
      </div>
      <AdminChat socket={socket} />
      <AdminFiles files={files} socket={socket} />
      <AdminPi />
    </div>
  );
}
