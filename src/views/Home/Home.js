import "./styles.css";
import { useEffect } from "react";

export default function Home({ socket, room, setRoom, username }) {
  useEffect(() => {
    if (room !== "home") {
      socket.emit("leaving room", { room });
      setRoom("home");
      socket.emit("room", { room: "home" });
    }
  }, [room, setRoom, socket]);

  return (
    <div className="home-view">
      <h2>Welcome, {username}!</h2>

      <div className="tabs four">
        <input id="tab-1" type="radio" name="list" />
        <label className="pseudo button setup toggle" htmlFor="tab-1">
          [Chat]
        </label>
        <input id="tab-2" type="radio" name="list" />
        <label className="pseudo button setup toggle" htmlFor="tab-2">
          [Files]
        </label>
        <input id="tab-3" type="radio" name="list" />
        <label className="pseudo button setup toggle" htmlFor="tab-3">
          [Admin]
        </label>
        <input id="tab-4" type="radio" name="list" />
        <label className="pseudo button setup toggle" htmlFor="tab-4">
          [About]
        </label>
        <div className="row">
          <div className="flex home-card">
            <h2 className="flex center one">[Chat]</h2>

            <div className="home-content">
              Chat in Real-Time with other connected users! <br></br> Read and
              write messages anonymously!
            </div>
          </div>

          <div className="flex home-card">
            <h2 className="flex center one">[Files]</h2>
            <div className="home-content">
              Share images, video, audio, documents and other digital content!{" "}
              <br></br>Important: Currently the size-limit for files is 50mb.
              This will be expanded in further releases.
            </div>
          </div>
          <div className="flex home-card">
            <h2 className="flex center one">[Admin]</h2>
            <div className="home-content">
              The Admin-Panel is password protected but not user-related. Every
              user with the password can enter the panel. <br></br> The Admin
              Panel gives real-time information about the Chat, Files and global
              System. Delete files and messages, change wireless-setup and
              reboot/shutdown the Pi
            </div>
          </div>
          <div className=" flex home-card">
            <h2 className="flex center one">[About DeadNode]</h2>

            <div className="home-content">
              DeadNode is a self-contained mobile file-sharing and messaging
              device inspired by the Open Source project "PirateBox". <br></br>
              It uses free, Open Source software to create a wireless network
              where users can share digital content and messages anonymously.
              <br></br>
              No user information gets stored on the device.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
