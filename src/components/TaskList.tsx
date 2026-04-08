import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (task: Task) => void;
}

function TaskList({ tasks, toggleTask, deleteTask, startEdit }: Props) {
  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-gray-800 rounded">
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
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;