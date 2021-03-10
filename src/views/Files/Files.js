import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LocalStorage from "../../Components/LocalStorage";

export default function Files({ socket, room }) {
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    socket.on("loadNewFile", async () => {
      try {
        const res = await axios.get("http://localhost:4000/local");
        setAllFiles(res.data.data);
      } catch (err) {
        console.log(err);
      }
    });
  });
  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:4000/local");
      setAllFiles(res.data.data);
      console.log(allFiles);
    } catch (err) {
      console.log(err);
    }

    console.log("joining room");
    socket.emit("room", { room: "localfiles-room" });

    return () => {
      if (room) {
        console.log("leaving room");
        socket.emit("leave room", {
          room: "localfiles-room",
        });
      }
    };
  }, []);

  return (
    <div className="file-view">
      <LocalStorage
        storageName="[local storage]"
        socket={socket}
        files={allFiles}
      />
    </div>
  );
}
