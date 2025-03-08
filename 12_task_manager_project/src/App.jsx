import React from "react";
import { ListContext } from "./Context/List";

export default function App() {
  // const

  return (
    <ListContext
      value={{
        todo,
        inProgress,
        completed,
        addTodo,
        addInProgress,
        addCompleted,
      }}

    >
      <h1 className="text-textPrimary font-bold underline">Hello world!</h1>
      <input type="text" placeholder="title" />
      <textarea type="text" placeholder="desc" />
      <h1></h1>
    </ListContext>
  );
}
