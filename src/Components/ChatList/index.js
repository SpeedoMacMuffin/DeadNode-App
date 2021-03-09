import "./styles.css";
import Message from "../Message";
import { useRef, useEffect, useState } from "react";
export default function ChatList({ list, newMsg }) {
  const [showNewMsg, setShowNewMsg] = useState({ newMsg });
  const bottomMsg = useRef();
  useEffect(() => {
    if (bottomMsg.current || newMsg) {
      setShowNewMsg(false);
      document.getElementById("bottom-msg").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [list]);
  return (
    <div className="chatList">
      <div className="message-empty"></div>
      {list.map((iteration, idx) => {
        return (
          <Message
            key={idx}
            id={idx}
            content={iteration.content}
            username={iteration.username}
          />
        );
      })}
      <div ref={bottomMsg} id="bottom-msg"></div>
    </div>
  );
}
