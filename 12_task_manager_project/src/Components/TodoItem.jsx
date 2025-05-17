import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center justify-between border rounded-lg px-4 py-3 gap-3 shadow-sm transition-all duration-300 ${
        todo.completed ? "bg-green-100" : "bg-purple-100"
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="w-5 h-5 accent-purple-600 cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />

        {/* Todo text */}
        <input
          type="text"
          className={`w-full bg-transparent text-base outline-none rounded-md transition-all ${
            isTodoEditable ? "border border-gray-300 px-2 py-1" : "border-none"
          } ${todo.completed ? "line-through text-gray-500" : "text-black"}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Edit/Save Button */}
        <button
          className="w-9 h-9 flex items-center justify-center bg-white text-xl border rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={todo.completed}
          title={isTodoEditable ? "Save" : "Edit"}
        >
          {isTodoEditable ? "💾" : "✏️"}
        </button>

        {/* Delete Button */}
        <button
          className="w-9 h-9 flex items-center justify-center bg-white text-xl border rounded-lg hover:bg-gray-100 transition"
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
