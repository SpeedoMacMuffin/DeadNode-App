import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./views/Chat/Chat";
import Files from "./views/Files/Files";
import Admin from "./views/Admin/Admin";
import Home from "./views/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import FormUsername from "./Components/FormUsername";
import FormPassword from "./Components/FormPassword";
import adminAPI from "./Api/adminAPI";
import socketClient from "socket.io-client";
import { chatServerUrl } from "../src/Api/ServerUrls";
const SERVER = chatServerUrl;

const socket = socketClient(SERVER);
function App() {
  const [room, setRoom] = useState("home");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [admin, setAdmin] = useState(false);

  // useEffect(() => {
  //   const getAuth = async () => {
  //     const res = await adminAPI.get("/auth");
  //     if (!res.data.auth) {
  //       setAdmin(true);
  //     }
  //   };
  //   getAuth();
  // }, []);

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
          <NavBar />

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
              {admin === true ? (
                <Admin
                  socket={socket}
                  room={room}
                  setRoom={setRoom}
                  admin={admin}
                  setAdmin={setAdmin}
                />
              ) : (
                <FormPassword admin={admin} setAdmin={setAdmin} />
              )}
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
