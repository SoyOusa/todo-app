function TaskPreview({ task, onToggleComplete }) {
    return (
        <div className="task-preview">
           <button
            type="button"
            className={`preview-check-btn ${task.completed ? "checked" : "" }`}
            onClick={() => onToggleComplete(task.id)}
            >
                {task.completed ? "✓" : ""}
            </button>

             <div className="preview-content">
                <h3>{task.title}</h3>
                <p>{task.category}</p>
             </div>

             <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                {task.priority}
             </span>
        </div>
    ); 
}

export default TaskPreview; 