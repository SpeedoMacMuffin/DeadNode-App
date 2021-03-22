import "./styles.css";
import React, { useEffect, useState } from "react";
import Api from "../../Api/fileAPI";
import LocalStorage from "../../Components/LocalStorage";

export default function Files({ socket, room, setRoom }) {
  const [allFiles, setAllFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFiles = async () => {
      const res = await Api.get("/local");
      const files = res.data.data;
      try {
        files.forEach(async (file) => {
          const res = await Api.get("/local/" + file);

          file = {
            name: res.data.data.name,
            path: res.data.data.url,
            size: res.data.data.details.size,
          };
          setNewFiles((newFiles) => [...newFiles, file]);
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getFiles();
  }, []);

  useEffect(() => {
    if (room !== "files") {
      socket.emit("leaving room", { room });
      setRoom("files");
      socket.emit("room", { room: "files" });
    }

    socket.on("files-deleted", () => {
      setNewFiles([]);
    });
    socket.on("file-added", async () => {
      const res = await Api.get("/local");
      const files = res.data.data;
      setNewFiles([]);
      try {
        files.forEach(async (file) => {
          const res = await Api.get("/local/" + file);

          file = {
            name: res.data.data.name,
            path: res.data.data.url,
            size: res.data.data.details.size,
          };
          setNewFiles((newFiles) => [...newFiles, file]);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  return (
    <div className="file-view">
      <LocalStorage
        storageName="[local storage]"
        socket={socket}
        allFiles={allFiles}
        newFiles={newFiles}
      />
    </div>
  );
}
