import { useState } from "react";
import AddTodo from "./add-todo";
import "./style.css";
import ViewTodo from "./view-todo";
import Filter from "./filter-todo/FilterTodo";

const TODO_KEY = "TODOS";

function Todo() {
  const [todoToAdd, setTodoToAdd] = useState("");

  const [todos, setTodos] = useState(loadInitialTodos);
  const [originalTodos, setOriginalTodos] = useState([]);

  // util
  function loadInitialTodos() {
    const initialTodos = localStorage.getItem(TODO_KEY);
    if (initialTodos) {
      return JSON.parse(initialTodos);
    }

    return [];
  }

  function handleAddTodo() {
    const oldTodos = structuredClone(todos);
    oldTodos.push({ todo: todoToAdd });
    setTodos(oldTodos);
    setOriginalTodos(oldTodos);
    setTodoToAdd("");
    persistTodos(oldTodos);
  }

  function persistTodos(todosToSave) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todosToSave));
  }

  function handleTodoToAddChange(value) {
    setTodoToAdd(value);
  }

  function handleDeleteTodo(index) {
    const oldTodos = structuredClone(todos);
    oldTodos.splice(index, 1);
    setTodos(oldTodos);
    setOriginalTodos(oldTodos);
    persistTodos(oldTodos);
  }

  function handleEditTodo(indexToEdit) {
    const oldTodos = structuredClone(todos).map((todo, index) => {
      todo.isEdit = index === indexToEdit;

      return todo;
    });

    setTodos(oldTodos);
    setOriginalTodos(oldTodos);
    persistTodos(oldTodos);
  }

  function handleCancelTodo(index) {
    const oldTodos = structuredClone(todos);
    oldTodos[index]["isEdit"] = false;
    setTodos(oldTodos);
    setOriginalTodos(oldTodos);
  }

  function handleSaveTodo({ index, value }) {
    const oldTodos = structuredClone(todos);
    oldTodos[index]["isEdit"] = false;
    oldTodos[index]["todo"] = value;
    setTodos(oldTodos);
    setOriginalTodos(oldTodos);
    persistTodos(oldTodos);
  }

  function handleDoneTodo(index) {
    const oldTodos = structuredClone(todos);
    oldTodos[index]["isCompleted"] = true;

    const pendingTodos = [];
    const doneTodos = [];

    for (let i = 0; i < oldTodos.length; i++) {
      const todo = oldTodos[i];

      if (todo.isCompleted) {
        doneTodos.push(todo);
      } else {
        pendingTodos.push(todo);
      }
    }

    const newTodosToAdd = [...pendingTodos, ...doneTodos];

    setTodos(newTodosToAdd);
    setOriginalTodos(newTodosToAdd);
  }

  function handleFilter(type) {
    const oldTodos = structuredClone(originalTodos);

    let newTodos = [];

    if (type === "completed") {
      newTodos = oldTodos.filter((todo) => todo.isCompleted);
    }

    if (type === "pending") {
      newTodos = oldTodos.filter((todo) => !todo.isCompleted);
    }

    setTodos(newTodos);
  }

  return (
    <div className="todo-app">
      <AddTodo
        todoToAdd={todoToAdd}
        setTodoToAdd={handleTodoToAddChange}
        onAddTodo={handleAddTodo}
      />

      <Filter onFilter={handleFilter} />

      <ViewTodo
        todos={todos}
        onEditTodo={handleEditTodo}
        onSaveTodo={handleSaveTodo}
        onDeleteTodo={handleDeleteTodo}
        onCancelTodo={handleCancelTodo}
        onDoneTodo={handleDoneTodo}
      />
    </div>
  );
}

export default Todo;
