import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function Home() {
    const { tasks } = useContext(TaskContext);

    return (
        <div>
            <h1>Task List</h1>
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks yet.</p>
                <p>Create your first task!</p>
              </div>    
            ) : (
              <div className="task-list">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task} 
                    />
                ))}
              </div>
            )}                   
        </div>
    );
}

export default Home;