import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";
import { isOverdue, isDueToday } from "../utils/dates";


function TaskCard({ task }) {
  const {deleteTask, toggleComplete} = useContext(TaskContext);
  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        <strong>Category:</strong> {task.category}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      
      <p>
        <strong>Due:</strong>{" "}
        {task.dueDate ? (
          <span className={overdue ? "due-overdue" : dueToday ? "due-today" : ""}>
            {task.dueDate}
            {overdue && " (Overdue)"}
            {dueToday && " (Today)"}
          </span>
        ) : (
          <span className="due-none">No due date</span>
        )}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={
            task.completed ? "status-completed" : "status-pending"
        }>
            {task.completed ? "Completed" : "Pending"} 
        </span>
      </p>
      
      <div className="task-actions">
        <Link to={`/edit/${task.id}`}>
          <button>Edit</button>
        </Link>
        
        <button id="toggle-btn" onClick={() => toggleComplete(task.id)}>
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button id="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>  
      </div>
      
    </div>
  );
}

export default TaskCard;