import "./styles.css";
import { useEffect } from "react";

export default function FormUsername({
  content,
  setContent,
  username,
  setUsername,
}) {
  useEffect(() => {
    console.log(localStorage.getItem("username"));
    const user = localStorage.getItem("username");
    if (user) {
      let decodedUser = atob(user);
      setUsername(decodedUser);
      console.log(decodedUser);
    } else {
      console.log("nope...didn't work");
    }
  }, []);
  const validatedContent = (name) => {
    if (name.replace(/\s/g, "") == "") {
      alert("Please enter a username");
    } else {
      let buff = new Buffer.from(name);
      let base64user = buff.toString("base64");
      setUsername(name);
      localStorage.setItem("username", base64user);
    }
  };
  return (
    <div className="username-view">
      <div className="one">
        <h2>Welcome to</h2>
        <span className="one logo">DeadNode</span>
        <p>Enter Username to proceed</p>
      </div>
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
    </div>
  );
}
