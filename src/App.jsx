import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState({ text: "", completed: false });
  const [view, setView] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdd = (task) => {
    if (!task.text.trim()) return;
    setTasks([...tasks, task]);
    setNewTask({ text: "", completed: false });
  };

  const handleTaskComplete = (task) => {
    const updatedTasks = tasks.map((t) =>
      t === task ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all tasks?"
    );
    if (confirmed) {
      setTasks([]);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (view === "all") return true;
    if (view === "completed") return task.completed;
    if (view === "in-progress") return !task.completed;
    return false;
  });

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="font-bold text-blue-800 text-3xl mb-4">TODO APP</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("in-progress")}
            aria-pressed={view === "in-progress"}
            className={
              "mb-2 px-3 py-1 rounded transition " +
              (view === "in-progress"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700")
            }
          >
            In Progress
          </button>
          <button
            onClick={() => setView("completed")}
            aria-pressed={view === "completed"}
            className={
              "mb-2 px-3 py-1 rounded transition " +
              (view === "completed"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700")
            }
          >
            Completed
          </button>
          <button
            onClick={() => setView("all")}
            aria-pressed={view === "all"}
            className={
              "mb-2 px-3 py-1 rounded transition " +
              (view === "all"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-700")
            }
          >
            All
          </button>

          <button
            className="bg-gray-400 rounded mb-2 px-3 py-1 text-white ml-auto transition hover:bg-gray-500"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask.text}
            onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleTaskAdd(newTask)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Add Task
          </button>
        </div>
        <ul className="w-full max-w-md space-y-2 divide-y">
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg border-gray-200"
            >
              <input
                type="checkbox"
                onChange={() => handleTaskComplete(task)}
                checked={task.completed}
                className="flex items-center cursor-pointer"
              />
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
