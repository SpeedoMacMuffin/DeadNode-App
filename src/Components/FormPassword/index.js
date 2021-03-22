import "./styles.css";
import { useState } from "react";
import adminApi from "../../Api/adminAPI";

export default function FormPassword({ setAdmin }) {
  const [pass, setPass] = useState("");
  const [fail, setFail] = useState(false);

  const submit = async (e) => {
    if (pass.replace(/\s/g, "") === "") {
      e.preventDefault();
      setPass("");
    } else {
      const message = { password: pass };
      e.preventDefault();

      if (pass === "ChangeMe") {
        setAdmin(true);
        setPass("");
      } else {
        setFail(true);
        setPass("");
        setTimeout(() => setFail(false), 2000);
      }
    }
  };

  return (
    <div className="password-view">
      <div className="one">
        <span className="one logo admin">Access restricted</span>
        <h3>Authorization required</h3>
      </div>
      <form
        onSubmit={submit}
        id="form-pass"
        className="send-form five username-form center"
      >
        <input
          type="password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          id="text"
          placeholder="Enter Password..."
          className="four-fifth message-input"
          required
        />

        <button id="submit" type="submit" className="fifth send-button">
          Send
        </button>
        {fail ? <span>Wrong Password!</span> : null}
      </form>
      <h5>This is a static Website</h5>
      <h5>The default password is "ChangeMe"</h5>
    </div>
  );
}
