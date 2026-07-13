import { useState } from "react"; 

function QuickAdd({ onAddTask }) {
    const [title, setTitle] = useState(""); 

    const handleAdd = (e) => {
        e.preventDefault(); 

        if(!title.trim()) {
            return; 
        }``

        const newTask = {
            id: Date.now(),
            title, 
            description: "",
            category: "General",
            priority: "Medium",
            completed: false, 
            completedAt: null, 
        }; 

        onAddTask(newTask); 
        setTitle(""); 
    }; 

    return (
        <form className="quick-add" onSubmit={handleAdd}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quickly add a task here..."
            />

            <button type="submit">+ Add</button>
        </form>
    );
}

export default QuickAdd; 