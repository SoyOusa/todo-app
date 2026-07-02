// src/App.jsx

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Completed from "./pages/Completed";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Navigation bar */}
      <Navbar />

      {/* Page content */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;