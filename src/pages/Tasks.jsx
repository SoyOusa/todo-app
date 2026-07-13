import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import {useState } from "react"; 

function Tasks() {
  const { tasks } = useTask();

  // Three independent filter/sort controls — each is its own piece of
  // component state because they're set by separate UI elements and
  // don't need to be combined into one object for this scale of form.
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortByDueDate, setSortByDueDate] = useState(false);

  // Build the category dropdown options dynamically from whatever
  // categories actually exist in the current tasks — avoids hardcoding
  // a category list that would go stale as the user adds new ones.
  // `Set` removes duplicates; spreading it back into an array makes it
  // usable with .map() below. "All" is prepended as the default option.
  const categories = ["All Categories", ...new Set(tasks.map((task) => task.category))];

  const filteredTasks = tasks
    // Step 1: filter — a task must pass ALL THREE conditions to show.
    // Each filter defaults to "match everything" when its dropdown is
    // set to "All", so an untouched filter never excludes a task.
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All Categories" || task.category === categoryFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
      return matchesSearch && matchesCategory && matchesPriority;
    })
    // Step 2: sort — runs AFTER filtering, on whatever passed step 1.
    // If the "sort by due date" checkbox is off, `return 0` tells
    // .sort() every pair is "equal", which leaves the original order
    // untouched — this is what makes the sort optional/toggleable.
    .sort((a, b) => {
      if (!sortByDueDate) return 0;

      // Tasks with no due date are pushed to the bottom regardless of
      // sort direction — comparing a real date against `undefined`
      // wouldn't sort sensibly, so this is an explicit special case.
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      // Comparing date strings directly ("2026-07-15" < "2026-07-20")
      // works correctly because ISO date format is zero-padded and
      // most-significant-digit-first — no need to convert to Date
      // objects, which would risk timezone-related off-by-one bugs.
      return a.dueDate < b.dueDate ? -1 : 1;
    });

  return (
    <div className="page tasks-page">
      <h1>All Tasks</h1>

      <div className="filters">
        {/* Controlled input: value comes from state, onChange writes
            back to state — React owns the input's value at all times,
            rather than reading it from the DOM only on submit. */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="sort-toggle">
        <input
          id="sortDue"
          type="checkbox"
          checked={sortByDueDate}
          onChange={(e) => setSortByDueDate(e.target.checked)}
        />
        <label htmlFor ="sortDue">
          Sort by due date
        </label>
      </div>

      {/* Empty-state check happens on filteredTasks, not tasks — this
          distinguishes "no tasks exist at all" from "tasks exist but
          none match the current filters", which is the correct message
          for a user actively searching/filtering. */}
      {filteredTasks.length === 0 ? (
        <p>No matching tasks found.</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;