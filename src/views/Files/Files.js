import "./styles.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Files({ socket, room }) {
  useEffect(() => {
    if (room) {
      socket.emit("leave room", {
        room: "chat-room",
      });
    }
  });
  return (
    <div className="fileView flex">
      <div className="flex two center">
        <div className="one button file-storage-button flex">
          <img className="stack" src="https://via.placeholder.com/500" />
          <h2>[local files]</h2>
          <div>
            <h3>[Storage Information]</h3>
            <span className="stack">System Info: </span>
            <span className="stack">System Info: </span>
            <span className="stack">System Info: </span>
            <span className="stack">System Info: </span>
          </div>
        </div>
        <div className="one button file-storage-button flex">
          <img className="stack" src="https://via.placeholder.com/500" />
          <h2>[external storage]</h2>
          <div>
            <h3>[Storage Information]</h3>
            <span className="stack">System Info: </span>
            <span className="stack">System Info: </span>
            <span className="stack">System Info: </span>
            <span className="stack">System Info: </span>
          </div>
        </div>
      </div>
    </div>
  );
}
