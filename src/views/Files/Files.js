import "./styles.css";
import React, { useEffect, useState } from "react";
import Api from "../../Api/fileAPI";
import LocalStorage from "../../Components/LocalStorage";

export default function Files({ socket, room, setRoom }) {
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (room !== "files") {
      socket.emit("leaving room", { room });
      setRoom("files");
      socket.emit("room", { room: "files" });
    }
    socket.on("loadNewFile", (err, file) => {
      if (err) {
        console.log(err);
      }
      // const res = await Api.get("/local");
      console.log(file);
      // setAllFiles((allFiles) => [...allFiles, file]);
      console.log(allFiles);
    });
  });
  useEffect(async () => {
    try {
      const res = await Api.get("/local");
      setAllFiles(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [allFiles]);

  return (
    <div className="file-view">
      <LocalStorage
        storageName="[local storage]"
        socket={socket}
        allFiles={allFiles}
      />
    </div>
  );
}
