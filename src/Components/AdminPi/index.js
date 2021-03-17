import "./styles.css";
import FormWifi from "../FormWifi";
import FormChangePW from "../FormChangePW";
import FormSurePi from "../FormSurePi";

export default function AdminPi({ clients }) {
  return (
    <div className="flex center message stats">
      <div>
        <h2 className="center one flex">[System]</h2>

        <span className="stack">Connected Clients: {clients}</span>
        <span className="stack">CPU usage:</span>
        <span className="stack">RAM usage:</span>
        <span className="stack">Wireless: </span>

        <FormWifi name="wifi" message="Wireless Settings" />
        <FormChangePW name="changePW" message="Password Settings" />
        {/* <button className="pseudo flex center setup">[Change Password]</button> */}
        <div className="flex center">
          {/* <button className="pseudo center danger">[Reboot Pi]</button> */}
          {/* <button className="pseudo  center danger">[Shutdown Pi]</button> */}

          <FormSurePi
            name="reboot"
            message="Reboot Pi"
            content="Are you sure? This will shutdown and reboot the Pi. This might take a while."
          />
          <FormSurePi
            name="shutdown"
            message="Shutdown Pi"
            content="Are you sure? This will shutdown the Pi."
          />
        </div>
      </div>
    </div>
  );
}
