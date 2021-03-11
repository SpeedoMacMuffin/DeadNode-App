import "./styles.css";

export default function AdminChat() {
  return (
    <div className="admin-chat one flex center message">
      <div>
        <h1 className="center one flex">[Chat]</h1>

        <span className="stack">Users online:</span>
        <span className="stack">Messages:</span>
        <span className="stack">Stat:</span>
        <button className="flex center danger pseudo">
          Delete Chat History
        </button>
      </div>
    </div>
  );
}
