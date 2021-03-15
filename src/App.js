import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./views/Chat/Chat";
import Files from "./views/Files/Files";
import Admin from "./views/Admin/Admin";
import Home from "./views/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import FormUsername from "./Components/FormUsername";
import socketClient from "socket.io-client";
import { chatServerUrl } from "../src/Api/ServerUrls";
const SERVER = chatServerUrl;

const socket = socketClient(SERVER);
function App() {
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState("home");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="App">
      {!username ? (
        <FormUsername
          content={content}
          setContent={setContent}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <Router>
          <NavBar in={inRoom} />

          <Switch>
            <Route path="/chat">
              <Chat
                username={username}
                socket={socket}
                room={room}
                setRoom={setRoom}
              />
            </Route>
            <Route path="/files">
              <Files socket={socket} room={room} setRoom={setRoom} />
            </Route>
            <Route path="/admin">
              <Admin socket={socket} room={room} setRoom={setRoom} />
            </Route>
            <Route path="/">
              <Home
                username={username}
                socket={socket}
                room={room}
                setRoom={setRoom}
              />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
