import { useState, useEffect } from "react";
import { TodoProvider } from "./Context/TodoContext";
import "./App.css";
import TodoForm from "./Components/ToDoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen py-10 px-4">
        <div className="w-full max-w-3xl mx-auto bg-[#1e293b] shadow-lg rounded-xl px-6 py-8 text-white border border-[#334155]">
          <h1 className="text-3xl font-bold text-center mb-8">
            Manage Your Todos
          </h1>

          <div className="mb-6">
            <TodoForm />
          </div>

          <div className="space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400">
                No todos yet. Add some!
              </p>
            ) : (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
