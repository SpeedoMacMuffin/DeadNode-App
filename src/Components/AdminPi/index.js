import "./styles.css";

export default function AdminPi() {
  return (
    <div className="one flex center message">
      <div>
        <h1 className="center one flex">[System]</h1>

        <span className="stack">CPU usage:</span>
        <span className="stack">RAM usage:</span>
        <span className="stack">Wireless: </span>
        <button className="pseudo flex center setup">Wireless Setup</button>
        <button className="pseudo flex center setup">Global Setup</button>
      </div>
    </div>
  );
}
