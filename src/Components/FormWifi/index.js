import "./styles.css";
import { useState, useEffect } from "react";
import adminApi from "../../Api/adminAPI";

export default function FormWifi({ name, onClick, message }) {
  const [failed, setFailed] = useState("");
  const [success, setSuccess] = useState("");
  const [ssid, setSsid] = useState("");
  const [key, setKey] = useState("ajfijapsdfjijasdfjöasjdkföjas");
  const [hide, setHide] = useState(false);

  const submit = () => {};
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
            <label htmlFor={name} className="close">
              &times;
            </label>
          </header>
          <section className="content">
            <form className="flex center two" onSubmit={submit}>
              <label className="stack">
                <input
                  onChange={(e) => setSsid(e.target.value)}
                  className="message-input"
                  type="text"
                  placeholder="Name(SSID)"
                  value={ssid}
                />
              </label>
              <label className="stack">
                <input
                  onChange={(e) => setKey(e.target.value)}
                  className="message-input"
                  type="password"
                  placeholder="Password"
                  value={key}
                />
              </label>
              {failed !== "" ? (
                <span className="message" style={{ color: "red" }}>
                  {failed}
                </span>
              ) : null}
              {success !== "" ? (
                <span className="message" style={{ color: "chartreuse" }}>
                  {success}
                </span>
              ) : null}
            </form>
          </section>
          <footer>
            <label
              htmlFor={name}
              className="button center half pseudo setup"
              onClick={onClick}
            >
              [Delete]
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
