import { NavLink } from "react-router-dom";

function Navbar() {
    return (
         <nav className="navbar">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/add-task">Add Task</NavLink>
            <NavLink to="/completed">Completed</NavLink>
            <NavLink to="/settings">Settings</NavLink>
        </nav>
    );        
}

export default Navbar;