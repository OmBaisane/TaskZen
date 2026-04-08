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
      <p className="mb-4 font-bold text-right text-emerald-400">
        Total Tasks : {tasks.length}
      </p>
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
