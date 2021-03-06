import "./styles.css";
import { useState } from "react";

export default function Start({ usrnm }) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="one flex center start modal">
      {!username ? (
        <form
          onSubmit={() => setUsername(content)}
          id="form"
          className="send-form five"
        >
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            id="text"
            placeholder="Enter Username..."
            className="four-fifth message-input"
            // required
          />

          <button id="submit" type="submit" className="fifth send-button">
            [Send]
          </button>
        </form>
      ) : null}
    </div>
  );
}
