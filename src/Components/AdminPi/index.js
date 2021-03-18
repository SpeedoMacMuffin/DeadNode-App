import "./styles.css";
import { useEffect, useState } from "react";
import FormWifi from "../FormWifi";
import FormChangePW from "../FormChangePW";
import FormSurePi from "../FormSurePi";
import FormRequirePW from "../FormRequirePW";
import adminApi from "../../Api/adminAPI";

export default function AdminPi({ clients, admin, setAdmin }) {
  const [output, setOutput] = useState("");
  const [ssid, setSsid] = useState("");
  const [passKey, setPassKey] = useState("");
  const [privateWifi, setPrivateWifi] = useState(true);
  const [systemStats, setSystemStats] = useState({})

  useEffect(async () => {
    const res = await adminApi.get("/wifi");
    console.log(res.data)
    setSsid(res.data.ssid)
    setPassKey(res.data.pw)
    setPrivateWifi(res.data.required)
  }, []);
  useEffect(async () => {
    const res = await adminApi.get("/system")
    console.log(res.data)
    setSystemStats({cpuTemp: res.data.cpuTemp, memTotal: res.data.memorytotal, memUsed: res.data.memoryused.replace("-", "")})
    console.log(systemStats)
  }, [])

  const shutdown = async () => {
    const res = await adminApi.get("/shutdown");
    console.log(res.data.output.toString());
    setOutput(res.data.output.toString());
    setTimeout(() => setOutput(""), 3000);
  };

  const reboot = async () => {
    const res = await adminApi.get("/reboot");
    console.log(res.data.output.toString());
    setOutput(res.data.output.toString());
    setTimeout(() => setOutput(""), 3000);
  };

  return (
    <div className="flex center message stats">
      <div>
        <h2 className="center one flex">[System]</h2>

        <span className="stack">Connected Clients: {clients}</span>
        <span className="stack">CPU Temp.: {systemStats.cpuTemp}</span>
        <span className="stack">RAM Total: {systemStats.memTotal}</span>
        <span className="stack">RAM Usage: {systemStats.memUsed}</span>
        <FormWifi
          name="wifi"
          message="Wireless Settings"
          ssid={ssid}
          setSsid={setSsid}
          passKey={passKey}
          setPassKey={setPassKey}
          privateWifi={privateWifi}
          setPrivateWifi={setPrivateWifi}
        />
        <FormChangePW name="changePW" message="Password Settings" />
        <div className="flex center">
          <FormSurePi
            name="reboot"
            message="Reboot Pi"
            content="Are you sure? This will shutdown and reboot the Pi. This might take a while. Please refresh in a bit."
            onClick={reboot}
          />
          <FormSurePi
            name="shutdown"
            message="Shutdown Pi"
            content="Are you sure? This will shutdown the Pi."
            onClick={shutdown}
          />
          {output !== "" ? (
            <span className="flex one center" style={{ color: "chartreuse" }}>
              {output}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
