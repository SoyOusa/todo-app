import { createContext, useContext } from "react";

export const TaskContext = createContext(null);

export function useTask() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used inside TaskProvider");
  }

  return context;
}