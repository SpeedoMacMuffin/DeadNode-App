import "./styles.css";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" className="brand">
        <span>DeadNode</span>
      </NavLink>

      <input id="bmenub" type="checkbox" className="show" />
      <label for="bmenub" className="burger pseudo button">
        [Menu]
      </label>
      <div className="menu ">
        <NavLink className="button pseudo" to="/chat">
          [Chat]
        </NavLink>
        <NavLink className="button pseudo" to="/files">
          [Files]
        </NavLink>

        <NavLink className="button pseudo" to="/admin">
          [Admin]
        </NavLink>
      </div>
    </nav>
  );
}
