interface Props {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
  editId: number | null;
  darkMode: boolean;
}

function TaskInput({ input, setInput, addTask, editId, darkMode }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
        className={`p-2 rounded w-full ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
      />

      <button
        className={`px-4 py-2 rounded active:scale-95 ${darkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 hover:bg-blue-400"}`}
        onClick={addTask}
      >
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TaskInput;
