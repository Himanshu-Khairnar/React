import React, { useState } from "react";

export default function App() {
  const [color, setColor] = useState("red");

  const colors = ["red", "blue", "green", "yellow", "gray"];

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center transition-all duration-300`}
      style={{ backgroundColor: color }}
    >
      <p className="text-white text-2xl font-semibold mb-6">
        Current Color: {color}
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`px-4 py-2 rounded-md shadow-md text-white font-medium transition hover:scale-105`}
            style={{ backgroundColor: c }}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
