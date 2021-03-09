import "./styles.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function NavBar({ is }) {
  const [isIn, setIsIn] = useState({ is });
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
        <NavLink
          className="button pseudo"
          to="/chat"
          onClick={() => setIsIn(true)}
        >
          [Chat]
        </NavLink>
        <NavLink
          className="button pseudo"
          to="/files"
          onClick={() => setIsIn(false)}
        >
          [Files]
        </NavLink>

        <NavLink
          className="button pseudo"
          to="/settings"
          onClick={() => setIsIn(false)}
        >
          [Settings]
        </NavLink>
      </div>
    </nav>
  );
}
