import { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

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
