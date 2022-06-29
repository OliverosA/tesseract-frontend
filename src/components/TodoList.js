import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from "axios"; //importando axios para la comunicacion con la API

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //console.log(todos);
    axios.get("http://localhost:3000/api/v1/to-dos/").then(({ data }) => {
      setTodos(data.todos);
    });
  }, []);

  const addTodo = (todo) => {
    //validando que title no este vacio o no tenga solo espacios en blanco
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    axios
    .post("http://localhost:3000/api/v1/to-dos/", {...todo}).then(() => {
      axios.get("http://localhost:3000/api/v1/to-dos/").then(({ data }) => {
        setTodos(data.todos);
        console.log(data.todos);
      });
    });

    //const newTodos = [todo, ...todos];

    //setTodos(newTodos);
    //console.log(...todos);
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
