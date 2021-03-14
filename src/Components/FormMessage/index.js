import "./styles.css";
import { useEffect, useRef } from "react";

export default function FormMessage({ content, setContent, submit }) {
  const messageForm = useRef();
  useEffect(() => {
    if (messageForm.target) {
      document.getElementById("form").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);
  return (
    <form onSubmit={submit} ref={messageForm} id="form" className="send-form">
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        id="text"
        placeholder="Enter Message..."
        className="four-fifth message-input"
        required
      />

      <button id="submit" type="submit" className="fifth send-button">
        Send
      </button>
    </form>
  );
}
