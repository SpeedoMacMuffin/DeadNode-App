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
    <div>
      <h1>FileServer</h1>
      <Link to="/chat">Chat</Link>
    </div>
  );
}
