import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from "axios";
import { getTodos, updateTodos } from "../lib/api";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => alert(error.message));
  }, []);

  const addTodo = (todo) => {
    //validando que title no este vacio o no tenga solo espacios en blanco
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    axios
    .post("http://localhost:3000/api/v1/to-dos/", {...todo}).then(() => {
      getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => {return});
    });
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    // creando metodo para actualizar ToDo en la API
    updateTodos(todoId, newValue).then(() => {
      getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => console.log(error));
    })

  };

  const removeTodo = (id) => {
    axios
    .delete(`http://localhost:3000/api/v1/to-dos/${id}`).then(() => {
      getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => alert(error.message));
    });
  };

  const completeTodo = (id, is_done) => {
    updateTodos(id, {isDone: is_done ===1 ? 0 : 1})
    .then(() => {
      getTodos()
      .then((todos) => setTodos(todos))
      .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo}/>
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
        
      />
    </>
  );
}

export default TodoList;
