interface Props {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
  editId: number | null;
}

function TaskInput({ input, setInput, addTask, editId }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
        className="p-2 rounded text-black w-full"
      />

      <button
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 active:scale-95"
        onClick={addTask}
      >
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TaskInput;