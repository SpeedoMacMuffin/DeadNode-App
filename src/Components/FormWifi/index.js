import "./styles.css";
import { useState, useEffect } from "react";
import adminApi from "../../Api/adminAPI";
import FormSurePi from "../FormSurePi";

export default function FormWifi({
  name,
  onClick,
  message,
  ssid,
  setSsid,
  passKey,
  setPassKey,
  privateWifi,
  setPrivateWifi,
}) {
  const [failed, setFailed] = useState("");
  const [success, setSuccess] = useState("");
  const [key2, setKey2] = useState("");
  const [key2Rep, setKey2Rep] = useState("");
  const [changePW, setChangePW] = useState(false)

  const makePasswordHidden = () => {
    document.getElementById("password").setAttribute("type", "password");
}
const makePassword2Hidden = () => {
  document.getElementById("password2").setAttribute("type", "password");
}

  const submit = async (e) => {
    if(passKey.length < 8 || passKey.length > 63){
      e.preventDefault()
      setTimeout(() => setFailed(""), 3000)
      return setFailed("Error: Password has to be between 8 and 63 characters!");
    }
    if (!privateWifi) {
      e.preventDefault()
      console.log("open wifi!");
      
      const res = await adminApi.put("/wifiop", { ssid: ssid, privateWifi: privateWifi });
      console.log(res)
      
      res.data.changed
        ? setSuccess(res.data.message)
        : setFailed("Error: " + res.data.message);
      setTimeout(() => setFailed(""), 3000);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      if(changePW && (key2.replace(/\s/g, "") == "" ||
      key2Rep.replace(/\s/g, "") == "")){
        e.preventDefault();
        setFailed("Error: No empty fields!");
        setTimeout(() => setFailed(""), 3000);
      } else {
      if (
        ssid.replace(/\s/g, "") == "" ||
        passKey.replace(/\s/g, "") == ""
        ) {
        e.preventDefault();
        setFailed("Error: No empty fields!");
        setTimeout(() => setFailed(""), 3000);
      } else {
        if (changePW && key2 !== key2Rep) {
          e.preventDefault();
          setKey2("");
          setKey2Rep("");
          setFailed("Error: New Passwords don't match!");
          setTimeout(() => setFailed(""), 3000);
        } else 
        {
          if(changePW){
            if(key2.length < 8 || key2.length > 64){
              e.preventDefault();
              setKey2("");
              setKey2Rep("")
              setTimeout(() => setFailed(""), 3000)
             return setFailed("Error: Only Passwords between 8 and 64 Characters!")
              
            }
          }
          e.preventDefault();

          const changeReq = {
            ssid: ssid,
            passKey: passKey,
            newPassKey: key2,
            privateWifi: privateWifi
          };
          const res = await adminApi.put("/wifipriv", changeReq);
          console.log(res.data);

          res.data.changed
            ? setSuccess(res.data.message)
            : setFailed("Error: " + res.data.message);
          setTimeout(() => setFailed(""), 3000);
          setTimeout(() => setSuccess(""), 3000);
        }
      }
    }}
  };
  return (
    <div>
      <label htmlFor={name} className="button flex center setup pseudo">
        [{message}]
      </label>

      <div className="modal ">
        <input id={name} type="checkbox" />
        <label htmlFor={name} className="overlay"></label>
        <article id="form-wifi">
          <header>
            <h3>[WIRELESS SETTINGS]</h3>
            <h4>
              Changes will only be applied after reboot. Please reboot after
              sending.
            </h4>
            <label htmlFor={name} className="close">
              &times;
            </label>
          </header>
          <section className="content">
            <form className="flex center">
              <label className="stack">
                <input
                  onChange={(e) => setSsid(e.target.value)}
                  className="message-input"
                  type="text"
                  placeholder="Name(SSID)"
                  value={ssid}
                />
              </label>
              {privateWifi ? (
                <div className="form-wifi-passwords flex center one">
                  <label className="stack">
                    <input
                      onChange={(e) => setPassKey(e.target.value)}
                      className="message-input"
                      type="password"
                      placeholder="Password"
                      value={passKey}
                    />
                  </label>
                 
                 {changePW ?  <div><label className="stack">
                    <input
                      onChange={(e) => setKey2(e.target.value)}
                      className="message-input"
                      type="test"
                      id="password"
                      placeholder="New Password"
                      value={key2}
                      onFocus={() => makePasswordHidden()}
                    />
                  </label>
                  <label className="stack">
                    <input
                      onChange={(e) => setKey2Rep(e.target.value)}
                      className="message-input"
                      type="text"
                      id="password2"
                      placeholder="Repeat New Password"
                      value={key2Rep}
                      onFocus={() => makePassword2Hidden()}
                    />
                  </label> </div> : null}
                </div>
              ) : null}
              {failed !== "" ? (
                <span className="flex center one" style={{ color: "red" }}>
                  {failed}
                </span>
              ) : null}
              {success !== "" ? (
                <span className="flex center one" style={{ color: "chartreuse" }}>
                  {success}
                </span>
              ) : null}
            </form>
            <div className="one">
              {changePW ? (
                <button
                  onClick={() => setChangePW(false)}
                  className="pseudo setup danger"
                >
                  [Keep Password]
                </button>
              ) : (
                <button
                  onClick={() => setChangePW(true)}
                  className="pseudo setup"
                >
                  [Change Password]
                </button>
              )}
              {privateWifi ? (
                <button
                  onClick={() => setPrivateWifi(false)}
                  className="pseudo setup error"
                >
                  [Set Open Network]
                </button>
              ) : (
                <button
                  onClick={() => setPrivateWifi(true)}
                  className="pseudo setup"
                >
                  [Set Private Network]
                </button>
              )}
            </div>
          </section>
          <footer>
            <label
              htmlFor={name}
              className="button center half pseudo setup"
              onClick={submit}
            >
              [Send]
            </label>
            <label htmlFor={name} className="button center danger pseudo half">
              [Cancel]
            </label>
          </footer>
        </article>
      </div>
    </div>
  );
}
