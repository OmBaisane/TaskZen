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
    <li key={task.id} className="flex justify-between items-center mb-2 gap-2">
      <span
        onClick={() => toggleTask(task.id)}
        className={`cursor-pointer ${task.status === "done" ? "line-through text-gray-400" : darkMode ? "text-white" : "text-black"}`}
      >
        {task.text}
      </span>

      {task.status !== "done" && (
        <button
          className={`px-2 py-1 rounded active:scale-95 ${darkMode ? "bg-yellow-400 hover:bg-yellow-500" : "bg-yellow-300 hover:bg-yellow-400"}`}
          onClick={() => startEdit(task)}
        >
          Edit
        </button>
      )}

      <button
        onClick={() => deleteTask(task.id)}
        className={`px-2 py-1 rounded active:scale-95 ${darkMode ? "bg-red-500 hover:bg-red-600" : "bg-red-400 hover:bg-red-500"}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
