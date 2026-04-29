import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (task: Task) => void;
  darkMode: boolean;
}

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  startEdit,
  darkMode,
}: Props) {
  return (
    <div
      className={`max-w-md mx-auto mt-10 p-5 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
    >
      {tasks.length > 0 && (
        <p className="mb-4 text-sm text-right">
          Total: {tasks.length} | Pending:{" "}
          {tasks.filter((t) => t.status === "pending").length} | Done:{" "}
          {tasks.filter((t) => t.status === "done").length}
        </p>
      )}
      {tasks.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No tasks yet.</p>
      )}
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            darkMode={darkMode}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
