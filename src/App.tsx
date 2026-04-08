import { useEffect, useState } from "react";
import { Task } from "./types/task";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  const [input, setInput] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, text: input } : task,
        ),
      );
      setEditId(null);
    } else {
      const newTask: Task = {
        id: Date.now(),
        text: input,
        status: "pending",
      };
      setTasks([...tasks, newTask]);
    }
    setInput("");
  };

  const startEdit = (task: Task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "pending" ? "done" : "pending" }
          : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTask = tasks.filter((task) => {
    if (filter === "pending") return task.status === "pending";
    if (filter === "done") return task.status === "done";
    return true;
  });

  return (
    <div
      className={`min-h-screen p-5 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`mb-4 px-4 py-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-500 text-black"}`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <h1 className="text-3xl font-bold mb-4">TaskZen</h1>

      <TaskInput
        input={input}
        setInput={setInput}
        addTask={addTask}
        editId={editId}
        darkMode={darkMode}
      />

      <div className="flex gap-2 mb-4">
        <button
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 active:scale-95"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 active:scale-95"
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 active:scale-95"
          onClick={() => setFilter("done")}
        >
          Done
        </button>
      </div>

      <TaskList
        tasks={filteredTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        startEdit={startEdit}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
