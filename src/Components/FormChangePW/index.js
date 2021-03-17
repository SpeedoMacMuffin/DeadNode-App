import "./styles.css";
import { useState, useEffect } from "react";
import adminApi from "../../Api/adminAPI";

export default function FormChangePW({ name, onClick, message }) {
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [newPW2, setNewPW2] = useState("");
  const [failed, setFailed] = useState("");
  const [success, setSuccess] = useState("");
  const submit = async (e) => {
    if (
      currentPW.replace(/\s/g, "") == "" ||
      newPW.replace(/\s/g, "") == "" ||
      newPW2.replace(/\s/g, "") == ""
    ) {
      e.preventDefault();
      setCurrentPW("");
      setNewPW("");
      setNewPW2("");
      setFailed("Error: No empty fields!");
      setTimeout(() => setFailed(""), 3000);
    } else {
      if (newPW !== newPW2) {
        e.preventDefault();
        setCurrentPW("");
        setNewPW("");
        setNewPW2("");
        setFailed("Error: New passwords don't match!");
        setTimeout(() => setFailed(""), 3000);
      } else {
        e.preventDefault();
        const changeReq = { password: currentPW, newPassword: newPW };

        const res = await adminApi.put("/auth", changeReq);
        console.log(res.data);
        setCurrentPW("");
        setNewPW("");
        setNewPW2("");
        res.data.changed
          ? setSuccess(res.data.message)
          : setFailed("Error: " + res.data.message);
        setTimeout(() => setFailed(""), 3000);
        setTimeout(() => setSuccess(""), 3000);
      }
    }
  };

  return (
    <div>
      <label htmlFor={name} className="button flex center setup pseudo">
        [{message}]
      </label>

      <div className="modal">
        <input id={name} type="checkbox" />
        <label htmlFor={name} className="overlay"></label>
        <article id="form-changePW">
          <header>
            <h3>[PASSWORD SETTINGS]</h3>
            <label htmlFor={name} className="close">
              &times;
            </label>
          </header>
          <section className="content">
            <form className="flex center two" onSubmit={submit}>
              <label className="stack">
                <input
                  onChange={(e) => setCurrentPW(e.target.value)}
                  className="message-input"
                  type="password"
                  placeholder="Current Password"
                  value={currentPW}
                />
              </label>
              <label className="stack">
                <input
                  onChange={(e) => setNewPW(e.target.value)}
                  className="message-input"
                  type="password"
                  placeholder="New Password"
                  value={newPW}
                />
              </label>
              <label className="stack">
                <input
                  onChange={(e) => setNewPW2(e.target.value)}
                  className="message-input"
                  type="password"
                  placeholder="Repeat New Password"
                  value={newPW2}
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
              id="submit"
              className="button center half pseudo setup"
              type="submit"
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
