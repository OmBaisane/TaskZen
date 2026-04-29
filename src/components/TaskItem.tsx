import { Task } from "../types/task";

interface Props {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (task: Task) => void;
  darkMode: boolean;
}

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  startEdit,
  darkMode,
}: Props) {
  return (
    <li
      className={`flex justify-between items-center gap-2 mb-3 p-3 rounded-lg hover:scale-[1.02] transition ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}
    >
      <span
        onClick={() => toggleTask(task.id)}
        className={`flex-1 cursor-pointer ${task.status === "done" ? "line-through text-gray-400" : darkMode ? "text-white" : "text-black"}`}
      >
        {task.text}
      </span>

      <div className="flex gap-2">
        {task.status !== "done" && (
          <button
            className={`px-3 py-1 rounded text-sm active:scale-95 transition ${darkMode ? "bg-yellow-400 hover:bg-yellow-500 text-black" : "bg-yellow-300 hover:bg-yellow-400 text-black"}`}
            onClick={() => startEdit(task)}
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTask(task.id)}
          className={`px-3 py-1 rounded text-sm active:scale-95 transition ${darkMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-400 hover:bg-red-500 text-black"}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
