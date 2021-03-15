import "./styles.css";
import FormWifi from "../FormWifi";

export default function AdminPi({ clients }) {
  return (
    <div className="flex center message stats">
      <div>
        <h2 className="center one flex">[System]</h2>

        <span className="stack">Connected Clients: {clients}</span>
        <span className="stack">CPU usage:</span>
        <span className="stack">RAM usage:</span>
        <span className="stack">Wireless: </span>

        <FormWifi name="wifi" message="Wireless Setup" />
        <button className="pseudo flex center setup">[Change Password]</button>
        <div className="flex center">
          <button className="pseudo center danger">[Reboot Pi]</button>
          <button className="pseudo  center danger">[Shutdown Pi]</button>
        </div>
      </div>
    </div>
  );
}
