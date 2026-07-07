import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import StatCards from "../components/StatCards";
import QuickAdd from "../components/QuickAdd";
import TaskPreview from "../components/TaskPreview";
import { Link } from "react-router-dom";

function Home() {
    const { tasks, addTask, toggleComplete } = useContext(TaskContext);

    return (
        <div className="page home-page">
            <StatCards tasks={tasks} />
            <QuickAdd onAddTask={addTask} />
            <h1>Task List</h1>
            <Link to="/tasks" className="view-all-btn">
              View all →
            </Link>
            
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks yet.</p>
                <p>Create your first task!</p>
              </div>    
            ) : (
              <div className="task-list">
                {tasks.map((task) => (
                    <TaskPreview
                        key={task.id}
                        task={task} 
                        onToggleComplete={toggleComplete}
                    />
                ))}
              </div>
            )}             
        </div>
    );
}

export default Home;