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
  const [search, setSearch] = useState("");

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

  const filteredTask = tasks
    .filter((task) => {
      if (filter === "pending") return task.status === "pending";
      if (filter === "done") return task.status === "done";
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-5 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-500 text-black"}`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">TaskZen 🚀</h1>

        <TaskInput
          input={input}
          setInput={setInput}
          addTask={addTask}
          editId={editId}
          darkMode={darkMode}
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-3 mb-4 rounded-lg outline-none ${darkMode ? "bg-gray-700 text-white placeholder-gray-300" : "bg-gray-200 text-black placeholder-gray-500"}`}
        />

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded active:scale-95 ${darkMode ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded active:scale-95 ${darkMode ? "bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded active:scale-95 ${darkMode ? "bg-green-700" : "bg-green-500 hover:bg-green-600"}`}
            onClick={() => setFilter("done")}
          >
            Done
          </button>
        </div>

        <div className="flex justify-center sm:justify-end mt-2">
          <button
            onClick={() =>
              setTasks(tasks.filter((task) => task.status !== "done"))
            }
            className={`px-5 py-2 rounded-lg active:scale-95 transition ${darkMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-400 hover:bg-red-500 text-black"}`}
          >
            Clear Completed
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
    </div>
  );
}

export default App;
