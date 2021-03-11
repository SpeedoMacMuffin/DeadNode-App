import "./styles.css";

export default function AdminPi() {
  return (
    <div className="admin-pi one flex center message">
      <div>
        <h1>[System]</h1>

        <span className="stack">CPU usage:</span>
        <span className="stack">RAM usage:</span>
        <span className="stack">Wireless: </span>
        <button className="pseudo flex center setup">Wireless Setup</button>
      </div>
    </div>
  );
}
