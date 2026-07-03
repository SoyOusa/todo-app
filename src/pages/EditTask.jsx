import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, updateTask } = useContext(TaskContext);

  const task = tasks.find((task) => task.id === Number(id));

  // If the task doesn't exist
  if (!task) {
    return (
      <div>
        <h1>Task Not Found</h1>
        <p>The task you're trying to edit does not exist.</p>
      </div>
    );
  }

  const handleUpdate = (updatedTask) => {
    updateTask(updatedTask);
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Task</h1>

      <TaskForm
        initialTask={task}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
export default EditTask;
