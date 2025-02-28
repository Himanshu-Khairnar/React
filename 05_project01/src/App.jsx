import React from "react";
import { useState } from "react";

export default function App() {
  const [color, setcolor] = useState("red");
  return (
    <div style={{ backgroundColor: color , height:'100%'}} className="h-screen">
      <p>{color}</p>
      <button onClick={() => setcolor("red")}>Red</button>
      <button onClick={() => setcolor("blue")}>Blue</button>
      <button onClick={() => setcolor("green")}>Green</button>
      <button onClick={() => setcolor("yellow")}>Yellow</button>
      <button onClick={() => setcolor("gray ")}>Gray</button>
    </div>
  );
}
