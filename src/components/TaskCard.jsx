import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";
import { isOverdue, isDueToday } from "../utils/dates";
import { Trash2, Pencil, Check } from "lucide-react";

function TaskCard({ task }) {
  const { deleteTask, toggleComplete } = useContext(TaskContext);
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
        <span className={task.completed ? "status-completed" : "status-pending"}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </p>

      <div className="task-actions">
        <Link to={`/edit/${task.id}`}>
          <button title="Edit">
            <Pencil size={18} />
          </button>
        </Link>

        <button
          id="toggle-btn"
          title={task.completed ? "Mark pending" : "Mark complete"}
          onClick={() => toggleComplete(task.id)}
        >
          <Check size={18} />
        </button>

        <button
          id="delete-btn"
          title="Delete"
          onClick={() => {
            if (window.confirm(`Delete "${task.title}"? You can restore it from the trash later.`)) {
              deleteTask(task.id);
            }
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;