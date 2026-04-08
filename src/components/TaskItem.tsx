import { Task } from "../types/task";

interface Props {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (task: Task) => void;
}

function TaskItem({ task, toggleTask, deleteTask, startEdit }: Props) {
  return (
    <li key={task.id} className="flex justify-between items-center mb-2 gap-2">
      <span
        onClick={() => toggleTask(task.id)}
        className={`cursor-pointer ${task.status === "done" ? "line-through text-gray-400" : ""}`}
      >
        {task.text}
      </span>

      {task.status !== "done" && (
        <button
          className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 active:scale-95"
          onClick={() => startEdit(task)}
        >
          Edit
        </button>
      )}

      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 active:scale-95"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
