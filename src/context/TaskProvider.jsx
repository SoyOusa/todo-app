import { useState, useEffect } from "react"; 
import { TaskContext } from "./TaskContext"

export function TaskProvider({ children }) {
  const STORAGE_KEY = "tasks";
  const DELETED_STORAGE_KEY = "deletedTasks";

  const [tasks, setTasks] = useState(() => {
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

  const [deletedTasks, setDeletedTasks] = useState(() => {
    try {
      const saved = window.localStorage.getItem(DELETED_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load deleted tasks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      window.localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedTasks));
    } catch (error) {
      console.error("Failed to save deleted tasks to localStorage:", error);
    }
  }, [deletedTasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Soft delete: moves the task out of `tasks` and into `deletedTasks`
  // instead of discarding it, so it can be restored later. Reads `tasks`
  // directly rather than nesting a setter inside setTasks' updater —
  // nesting state setters like that risks double-firing under React
  // Strict Mode, which can double-insert the task into deletedTasks.
  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    console.log("deleteTask called with id:", id, "found:", taskToDelete);  // TEMP — remove after debugging
    if (!taskToDelete) return;

    setDeletedTasks((prevDeleted) => [
      ...prevDeleted,
      { ...taskToDelete, deletedAt: Date.now() },
    ]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const restoreTask = (id) => {
    const taskToRestore = deletedTasks.find((task) => task.id === id);
    if (!taskToRestore) return;

    const {  ...restoredTask } = taskToRestore;
    setTasks((prevTasks) => [...prevTasks, restoredTask]);
    setDeletedTasks((prevDeleted) => prevDeleted.filter((task) => task.id !== id));
  };

  const permanentlyDeleteTask = (id) => {
    setDeletedTasks((prevDeleted) => prevDeleted.filter((task) => task.id !== id));
  };

  const emptyTrash = () => {
    setDeletedTasks([]);
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
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
        updateTask,
        deletedTasks,
        restoreTask,
        permanentlyDeleteTask,
        emptyTrash,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}