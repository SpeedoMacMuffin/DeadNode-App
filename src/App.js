import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./views/Chat/Chat";
import Files from "./views/Files/Files";
import Admin from "./views/Admin/Admin";
import NavBar from "./Components/NavBar/NavBar";
import FormUsername from "./Components/FormUsername";
import socketClient from "socket.io-client";
import { chatServerUrl } from "../src/Api/ServerUrls";
const SERVER = chatServerUrl;

const socket = socketClient(SERVER);
function App() {
  const [inRoom, setInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const validatedContent = (name) => {
    if (name.replace(/\s/g, "") == "") {
      alert("Please enter a username");
    } else {
      setUsername(name);
    }
  };
  return (
    <div className="App">
      {username === "" ? (
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
              <Chat room={inRoom} username={username} socket={socket} />
            </Route>
            <Route path="/files">
              <Files room={inRoom} socket={socket} />
            </Route>
            <Route path="/admin">
              <Admin room={inRoom} socket={socket} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
