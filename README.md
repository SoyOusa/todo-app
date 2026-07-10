# Todo App

A React-based task management application built for [course name] final project. Supports task creation, editing, deletion, completion tracking, filtering, and due-date sorting, with data persisted locally in the browser.

**Live demo:** [add your Vercel URL here]

---

## Features

- **Create, edit, delete tasks** — each task has a title, description, category, priority (Low/Medium/High), and optional due date
- **Mark tasks complete/pending** — toggle status from the task card
- **Filter tasks** by category and priority on the Tasks page
- **Sort by due date** — optional toggle on the Tasks page
- **Due-date awareness** — tasks display "Overdue" or "Today" labels based on their due date
- **Dashboard** — summary stat cards (total, completed, pending, due today)
- **Dark mode** — toggle in Settings, persists across sessions
- **Reset all data** — clears all tasks from Settings, with confirmation
- **Data persistence** — tasks and theme preference are saved to `localStorage` and survive page refresh
- **Responsive layout** — adapts across desktop, tablet, and mobile widths

---

## Tech Stack

- **React** (Vite scaffold)
- **React Router** (`react-router-dom`) — client-side routing across 5 pages
- **React Context + `useState`** — global task state, shared across all pages without prop drilling
- **`useEffect`** — syncs task state and theme preference to `localStorage` on every change
- **Plain CSS** — no framework; media queries for responsive breakpoints
- **ESLint** — code linting
- **Vercel** — deployment

---

## Pages / Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Dashboard stats + quick task preview |
| `/tasks` | Tasks | Full task list with search, category/priority filters, due-date sort |
| `/add-task` | Add Task | Form to create a new task |
| `/edit/:id` | Edit Task | Same form, pre-filled, for editing an existing task |
| `/completed` | Completed | Read-only list of completed tasks |
| `/settings` | Settings | Dark mode toggle, reset all data |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)
- npm (comes with Node)

### Setup

```bash
git clone https://github.com/[your-username]/[your-repo-name].git
cd [your-repo-name]
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

---

## Project Structure

```
src/
  components/
    Navbar.jsx
    TaskCard.jsx
    TaskForm.jsx
    TaskPreview.jsx
    StatCards.jsx
    QuickAdd.jsx
  context/
    TaskContext.jsx     — Context + Provider, holds all task state and CRUD functions
  pages/
    Home.jsx
    Tasks.jsx
    AddTask.jsx
    EditTask.jsx
    Completed.jsx
    Settings.jsx
  utils/
    dates.js            — isOverdue() / isDueToday() helper functions
  App.jsx                — route definitions
  App.css
  main.jsx
```

---

## Key React Concepts Used

- **Context API**: `TaskContext` provides `tasks`, `addTask`, `deleteTask`, `updateTask`, and `toggleComplete` to any component that needs them, avoiding prop drilling across 5+ pages.
- **`useState`**: manages task list state, form field state, and filter/sort UI state.
- **`useEffect`**: two independent uses — (1) syncing task state to `localStorage` whenever it changes, and (2) applying the dark-mode class to the document root and persisting the theme preference.
- **Controlled components**: all form inputs (task form, filters, search) are React-controlled, with state as the single source of truth.
- **Dynamic routing**: `/edit/:id` uses `useParams()` to read the task ID from the URL and pre-fill the same form component used for adding a task — one shared component for both create and edit flows.

---

## Known Limitations

- No user authentication — all data is local to the browser and device
- Category is a free-text field, not a managed list — no dedicated category creation/deletion page
- No drag-and-drop reordering or subtasks
- [Add anything else you know is incomplete or untested at submission time]

---

## Author

[Your name] — solo project, [course name], [term/year]