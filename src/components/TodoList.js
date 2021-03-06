import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { DiGithubBadge } from "react-icons/di";

function TodoList() {
  const [todos, setTodos] = useState([]);

  React.useEffect(() => {
    const todosLocalStorage = localStorage.getItem("todos");
    if (todosLocalStorage) {
      setTodos(JSON.parse(todosLocalStorage));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <a href="https://github.com/imation199/React-ToDoApp" target="_blank" rel="noreferrer">
        <DiGithubBadge size={45} color="white" />
      </a>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
