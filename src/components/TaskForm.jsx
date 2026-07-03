import { useState } from "react";

function TaskForm({ onSubmit, initialTask }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [category, setCategory] = useState(initialTask?.category || "");
  const [priority, setPriority] = useState(initialTask?.priority || "Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !category.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

  const task = {
    id: initialTask?.id || Date.now(),
    title,
    description,
    category,
    priority,
    completed: initialTask?.completed || false,
    };


    onSubmit(task);

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>Task Title</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <br />

      <div>
        <label>Category</label>
        <br />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Study, Work, Personal..."
        />
      </div>

      <br />

      <div>
        <label>Priority</label>
        <br />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <br />

      <div>
        <label>Description</label>
        <br />
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description..."
        />
      </div>

      <br />

    <button type="submit">
      {initialTask ? "Save Changes" : "Add Task"}
    </button>

    </form>
  );
}

export default TaskForm;
