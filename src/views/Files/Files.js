import React from "react";
import { Link } from "react-router-dom";

export default function Files() {
  return (
    <div>
      <h1>FileServer</h1>
      <Link to="/chat">Chat</Link>
    </div>
  );
}
