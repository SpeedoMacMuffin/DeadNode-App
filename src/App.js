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
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8000";

const socket = socketClient(SERVER);

function App() {
  const [inRoom, setInRoom] = useState(false);
  console.log(socket);
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
  return (
    <div>
      <Router>
        <NavLink to="/chat" onClick={() => setInRoom(true)}>
          [Chat]
        </NavLink>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/files" onClick={() => setInRoom(false)}>
          Files
        </NavLink>
        <Switch>
          <Route path="/chat">
            <Chat room={inRoom} socket={socket} />
          </Route>
          <Route path="/files">
            <Files socket={socket} room={inRoom} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
