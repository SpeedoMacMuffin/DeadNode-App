import "./styles.css";

export default function Message({ content, username }) {
  return (
    <div className=" message one ">
      <div className="message-user one ">
        <h4>{username}</h4>
      </div>
      <div className="message-content one">{content}</div>
    </div>
  );
}
