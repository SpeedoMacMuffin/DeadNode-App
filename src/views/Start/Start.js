import { Link } from "react-router-dom";
export default function Start() {
  return (
    <div>
      <Link to="/chat">Chat</Link>
      <Link to="/files">Files</Link>
    </div>
  );
}
