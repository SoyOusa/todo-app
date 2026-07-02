import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/add-task">Add Task</Link>
            <Link to="/completed">Completed</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    );        
}

export default Navbar;