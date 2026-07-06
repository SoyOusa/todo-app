import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function Tasks() {
  const { tasks } = useContext(TaskContext);

  // Search input
  const [searchTerm, setSearchTerm] = useState("");

  // Category filter
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Priority filter
  const [priorityFilter, setPriorityFilter] = useState("All");
  
  // Get unique categories from existing tasks
  const categories = [
    "All",
    ...new Set(tasks.map((task) => task.category)),
  ];

  // Filter tasks based on search, category, and priority
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      task.category === categoryFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriority
    );
});
  return (
    <div>
      <h1>All Tasks</h1>

      {/* Search and Filter Section */}
      <div className="filters">

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p>No matching tasks found.</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
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

export default Tasks;