interface Props {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
  editId: number | null;
  darkMode: boolean;
}

function TaskInput({ input, setInput, addTask, editId, darkMode }: Props) {
  return (
    <div className="flex gap-3 mb-5">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
        className={`flex-1 p-3 rounded-lg outline-none ${darkMode ? "bg-gray-700 text-white placeholder-gray-300" : "bg-gray-200 text-black placeholder-gray-500"}`}
      />

      <button
        className={`px-5 py-2 rounded-lg active:scale-95 transition ${darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-400 hover:bg-blue-500 text-black"}`}
        onClick={addTask}
      >
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TaskInput;
