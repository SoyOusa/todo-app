// pages/Settings.jsx
import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";

export default function Settings() {
  const { setTasks } = useContext(TaskContext);
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
    if (window.confirm("Delete all tasks? This cannot be undone.")) {
      setTasks([]);
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
  </div>
);
}