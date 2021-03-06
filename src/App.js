import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Chat from "./views/Chat/Chat";
import Files from "./views/Files/Files";
import Start from "./views/Start/Start";
import NavBar from "./Components/NavBar/NavBar";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8000";

const socket = socketClient(SERVER);

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    socket.on("connection", () => {
      console.log("I am connected with the back-end!");
      console.log("My Socket-ID = " + socket.id);
      if (inRoom) {
        socket.emit("leave room", {
          room: "chat-room",
        });
      }
    });
  }, []);
  const validatedContent = (name) => {
    if (name.replace(/\s/g, "") == "") {
      alert("Please enter a task");
    } else {
      setUsername(name);
    }
  };
  return (
    <div className="App">
      {username === "" ? (
        <form
          onSubmit={() => validatedContent(content)}
          id="form"
          className="send-form five username-form center"
        >
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            id="text"
            placeholder="Enter Username..."
            className="four-fifth message-input"
            required
          />

          <button id="submit" type="submit" className="fifth send-button">
            Send
          </button>
        </form>
      ) : (
        <Router>
          <NavBar in={inRoom} />

          <Switch>
            <Route path="/chat">
              <Chat room={inRoom} socket={socket} username={username} />
            </Route>
            <Route path="/files">
              <Files socket={socket} room={inRoom} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
