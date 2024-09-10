import "./style.css";

function Todo({ todoToAdd, setTodoToAdd, onAddTodo }) {
  function handleInput(event) {
    const value = event?.target?.value;
    setTodoToAdd(value);
  }

  function handleKeyUp(event) {
    event.preventDefault();
    onAddTodo();
  }

  return (
    <form className="add-app" onSubmit={handleKeyUp}>
      <input
        value={todoToAdd}
        onInput={handleInput}
        placeholder="Add todo..."
        type="text"
      />

      <button>Add Todo</button>
    </form>
  );
}

export default Todo;
