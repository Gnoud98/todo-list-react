import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const storageList = JSON.parse(localStorage.getItem("todoList"));
    console.log("todoList", storageList);
    return storageList ?? [];
  });
  const [editInput, setEditInput] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    setTodoList((prev) => {
      const newTask = [...prev, task];
      localStorage.setItem("todoList", JSON.stringify(newTask));

      return newTask;
    });

    setTask("");
  }

  function handleDelete(index) {
    const newList = todoList.filter((_, i) => i !== index);
    localStorage.setItem("todoList", JSON.stringify(newList));
    setTodoList(newList);
  }

  function handleEdit(index, newEditInput) {
    const newList = todoList.map((item, i) =>
      i === index ? newEditInput : item
    );
    setTodoList(newList);
    localStorage.setItem("todoList", JSON.stringify(newList));
  }

  function handleClear() {
    localStorage.clear();
    const newList = [];
    setTodoList(newList);
    localStorage.setItem("todoList", JSON.stringify(newList));
  }

  return (
    <div className="App" style={{ padding: 32 }}>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {todoList.map((task, index) => (
          <>
            {editInput === index ? (
              <>
                <input
                  type="text"
                  defaultValue={task}
                  onChange={(e) => handleEdit(index, e.target.value)}
                />

                <button onClick={() => setEditInput(null)}>Save</button>
                <button onClick={() => setEditInput(null)}>Cancel</button>
              </>
            ) : (
              <>
                <li key={index}>
                  <span>{task}</span>

                  <button onClick={() => handleDelete(index)}>X</button>

                  <button onClick={() => setEditInput(index)}>Edit</button>
                </li>
              </>
            )}
          </>
        ))}
      </ul>

      <button onClick={handleClear}>Clear All</button>
    </div>
  );
}

export default App;
