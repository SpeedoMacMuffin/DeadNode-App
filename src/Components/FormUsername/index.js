import "./styles.css";

export default function FormUsername({
  content,
  setContent,
  username,
  setUsername,
}) {
  const validatedContent = (name) => {
    if (name.replace(/\s/g, "") == "") {
      alert("Please enter a username");
    } else {
      setUsername(name);
    }
  };
  return (
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
  );
}
