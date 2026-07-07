import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
function AddTask() {
  const { addTask } = useContext(TaskContext);

  return (
    <div className="page add-task-page">
      <h1>Add Task</h1>
      
      <TaskForm onSubmit={addTask} />
      
    </div>
  );
}

export default AddTask;
