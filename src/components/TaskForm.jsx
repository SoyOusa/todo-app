import { useState } from "react";

function TaskForm({ onSubmit, initialTask }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [category, setCategory] = useState(initialTask?.category || "");
  const [priority, setPriority] = useState(initialTask?.priority || "Medium");
   const [dueDate, setDueDate] = useState(initialTask?.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();

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
    dueDate: dueDate || null,
    completed: initialTask?.completed || false,
  };

  onSubmit(task);

  setTitle("");
  setDescription("");
  setCategory("");
  setPriority("Medium");
  setDueDate("");
  };

  return (
    <form  className="task-form" onSubmit={handleSubmit}>

      <div>
        <label>Task Title</label>
        <br />
        <input
          className="form-field"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <br />

      <div >
        <label>Category</label>
        <br />
        <input
          className="form-field"
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
          className="form-field"
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
        <label>Due date</label>
        <input className="form-field" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      


      <br />

      <div>
        <label>Description</label>
        <br />
        <textarea
          className="form-field"
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
