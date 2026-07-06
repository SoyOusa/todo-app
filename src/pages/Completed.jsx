import { useContext } from "react"; 
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";


function Completed() {
  const{ tasks } = useContext(TaskContext); 

  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div>
      <h1>Completed Tasks</h1>

      {completedTasks.length === 0 ? (
        <div className="empty-state">
          <p>No completed tasks yet.</p>
        </div>
      ) : (
        <div className="task-list">
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Completed;