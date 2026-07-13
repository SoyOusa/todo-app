import { useTask } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
function AddTask() {
  const { addTask } = useTask();

  return (
    <div className="page add-task-page">
      <h1>Add Task</h1>
      
      <TaskForm onSubmit={addTask} />
      
    </div>
  );
}

export default AddTask;
