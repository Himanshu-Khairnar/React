import React, { useState } from "react";
import "./App.css";
export default function App() {
  const [counter,setCounter]=useState(10)
  // let counter = 5;
  const addValue = () => {
    if(counter<20)
    {
    setCounter(counter + 1);

    }
  };
  const removeValue = () => {
    if(counter>0){
    setCounter(counter - 1);

    }
  };
  return (
    <div>
      <h1>Counter</h1>
      <h2>Counter Value: {counter}</h2>
      <button onClick={addValue}>Add</button>
      <br />
      <button onClick={removeValue}>Remove</button>
    </div>
  );
}
