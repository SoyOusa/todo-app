function TaskCard({ task }) {
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
        <strong>Status:</strong>{" "}
        <span className={
            task.completed ? "status-completed" : "status-pending"
        }>
            {task.completed ? "Completed" : "Pending"} 
        </span>
      
        <button id="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
        </button>  
      
      </p>
    </div>
  );
}

export default TaskCard;