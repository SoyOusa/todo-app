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

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
