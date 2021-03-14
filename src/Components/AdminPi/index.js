import "./styles.css";

export default function AdminPi({ clients }) {
  return (
    <div className="flex center message stats">
      <div>
        <h2 className="center one flex">[System]</h2>

        <span className="stack">Connected Clients: {clients}</span>
        <span className="stack">CPU usage:</span>
        <span className="stack">RAM usage:</span>
        <span className="stack">Wireless: </span>
        <button className="pseudo flex center setup">[Wireless Setup]</button>
        <button className="pseudo flex center setup">[Change Password]</button>
      </div>
    </div>
  );
}
