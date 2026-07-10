import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-header">
        <button
          type="button"
          className="menu-btn"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {"\u2630"}
        </button>
        <NavLink to="/" end className="nav-brand" onClick={closeMenu}>
          TO DO APP
        </NavLink>
      </div>

      <div className={menuOpen ? "nav-links active" : "nav-links"}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/tasks" onClick={closeMenu}>Tasks</NavLink>
        <NavLink to="/add-task" onClick={closeMenu}>Add Task</NavLink>
        <NavLink to="/completed" onClick={closeMenu}>Completed</NavLink>
        <NavLink to="/settings" onClick={closeMenu}>Settings</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
