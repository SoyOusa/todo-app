import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const STORAGE_KEY = "tasks";
  const [tasks, setTasks] = useState(() => {
    //Initialize tasks from localStorage, with error handling
    try {
      const savedTasks = window.localStorage.getItem(STORAGE_KEY);
      if (!savedTasks) return [];

      const parsedTasks = JSON.parse(savedTasks);
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      return [];
    }
  });

    // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const deleteTask = (id) => {
  setTasks((prevTasks) =>
    prevTasks.filter((task) => task.id !== id)
  );
  }; 
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task
    )
  );
  };
  const updateTask = (updatedTask) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === updatedTask.id
        ? updatedTask
        : task
      )
    );
  };

  return (
    <TaskContext.Provider 
    value={{ 
      tasks, 
      setTasks, 
      addTask, 
      deleteTask, 
      toggleComplete, 
      updateTask 
      }}>
      {children}
    </TaskContext.Provider>
  );
}