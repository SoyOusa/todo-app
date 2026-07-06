import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <h1>All Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;