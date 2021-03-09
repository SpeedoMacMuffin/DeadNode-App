import "./styles.css";

export default function FormMessage({ content, setContent, submit }) {
  return (
    <form onSubmit={submit} id="form" className="send-form">
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
