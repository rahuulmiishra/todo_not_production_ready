import { useState } from "react";
import "./style.css";

function ViewTodo({
  todos,
  onDeleteTodo,
  onEditTodo,
  onCancelTodo,
  onSaveTodo,
  onDoneTodo,
}) {
  const [localTodo, setLocalTodo] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(-1);

  function handleEditLocalTodo(event) {
    const value = event.target.value;
    setLocalTodo(value);
  }

  function handleDeleteTodo(index) {
    return () => {
      onDeleteTodo(index);
    };
  }

  function handleEditTodo(index) {
    return () => {
      onEditTodo(index);
      setEditTodoIndex(index);
      setLocalTodo(todos[index].todo);
    };
  }

  function handleCancel() {
    onCancelTodo(editTodoIndex);
  }

  function handleSave() {
    onSaveTodo({ index: editTodoIndex, value: localTodo });
    setLocalTodo("");
  }

  function handleDone(index) {
    return () => {
      onDoneTodo(index);
    };
  }

  return (
    <div className="todo-app">
      {todos?.map((todoObj, index) => {
        const todo = todoObj.todo;
        const isEdit = todoObj.isEdit;
        const isCompleted = todoObj.isCompleted;

        const dataAttr = isCompleted ? "done" : "pending";

        return (
          <div className="todo-row" key={index}>
            {isEdit && (
              <>
                <input
                  onChange={handleEditLocalTodo}
                  value={localTodo}
                  type="text"
                />
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </>
            )}
            {!isEdit && <span data-todo-status={dataAttr}>{todo}</span>}

            {!isEdit && (
              <>
                <button onClick={handleEditTodo(index)}>Edit</button>
                <button onClick={handleDeleteTodo(index)} className="danger">
                  Delete
                </button>
                <button onClick={handleDone(index)} className="success">
                  Done
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ViewTodo;
