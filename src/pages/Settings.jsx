import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";

export default function Settings() {
  const { tasks, deleteTask, deletedTasks, restoreTask, permanentlyDeleteTask, emptyTrash } = useContext(TaskContext);
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme === null) {
      localStorage.setItem("theme", "light");
      return false;
    }
    return theme === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function handleReset() {
    if (tasks.length === 0) {
    alert("There are no tasks to delete.");
    return;
  }
    if (window.confirm("Delete all tasks? You can use the trash to restore them later.")) {
      tasks.forEach((task) => deleteTask(task.id));
    }
}

  function handleEmptyTrash() {
    if (window.confirm("Permanently delete all items in trash? This cannot be undone.")) {
      emptyTrash();
    }
  }

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="settings-row">
        <label className="settings-toggle">
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          Dark mode
        </label>
      </div>

      <div className="settings-row">
        <button className="reset-btn" onClick={handleReset}>Reset all data</button>
      </div>

      <h3>Recently deleted</h3>

      {deletedTasks.length === 0 ? (
        <p className="empty-state">Trash is empty.</p>
      ) : (
        <>
          <div className="trash-list">
            {deletedTasks.map((task) => (
              <div className="trash-item" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <p className="trash-meta">
                    Deleted {new Date(task.deletedAt).toLocaleString()}
                  </p>
                </div>
                <div className="trash-actions">
                  <button onClick={() => restoreTask(task.id)}>Restore</button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm(`Permanently delete "${task.title}"? This cannot be undone.`)) {
                        permanentlyDeleteTask(task.id);
                      }
                    }}
                  >
                    Delete forever
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="reset-btn" onClick={handleEmptyTrash}>Empty trash</button>
        </>
      )}
    </div>
  );
}