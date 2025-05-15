import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="flex items-center w-full max-w-xl mx-auto mt-4 shadow-md"
    >
      <input
        type="text"
        placeholder="Write a todo..."
        className="flex-1 px-4 py-2 text-sm text-gray-800 bg-white rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-r-md hover:bg-green-700 active:scale-95 transition-all duration-150"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
