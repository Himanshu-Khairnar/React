import  { useState } from "react";
import { puzzle, clone } from "./utils/sudoku.js";
import "./index.css";

const App = () => {
  const [board, setBoard] = useState(clone(puzzle));
  const [completed, setCompleted] = useState(false);

  const isPreFilled = (row, col) => puzzle[row][col] !== null;

  const handleChange = (row, col, value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 9) return;

    const newBoard = clone(board);
    newBoard[row][col] = num;
    setBoard(newBoard);
  };

  const isValid = (grid) => {
    const isUnique = (arr) => {
      const nums = arr.filter(Boolean);
      return new Set(nums).size === nums.length;
    };

    for (let i = 0; i < 9; i++) {
      if (
        !isUnique(grid[i]) || // row
        !isUnique(grid.map((row) => row[i])) // col
      )
        return false;

      const box = [];
      const rowOffset = Math.floor(i / 3) * 3;
      const colOffset = (i % 3) * 3;

      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++)
          box.push(grid[rowOffset + r][colOffset + c]);

      if (!isUnique(box)) return false;
    }

    return true;
  };

  const checkCompletion = () => {
    const isFilled = board.every((row) => row.every((cell) => cell !== null));
    if (isFilled && isValid(board)) {
      setCompleted(true);
    } else {
      alert("Invalid solution or incomplete!");
    }
  };

  const resetBoard = () => {
    setBoard(clone(puzzle));
    setCompleted(false);
  };

  return (
    <div className="sudoku-container">
      <h2 className="text-xl mb-2">Sudoku Game</h2>
      <div className="grid grid-cols-9 gap-1 border border-black p-1">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              className={`w-8 h-8 text-center border ${
                isPreFilled(r, c)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white"
              }`}
              type="text"
              maxLength="1"
              value={cell === null ? "" : cell}
              disabled={isPreFilled(r, c)}
              onChange={(e) => handleChange(r, c, e.target.value)}
            />
          ))
        )}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={checkCompletion}
          className="bg-green-500 px-4 py-1 text-white rounded"
        >
          Check
        </button>
        <button
          onClick={resetBoard}
          className="bg-blue-500 px-4 py-1 text-white rounded"
        >
          Restart
        </button>
      </div>
      {completed && (
        <p className="mt-2 text-green-700 font-bold">
          🎉 Congratulations! You solved it!
        </p>
      )}
    </div>
  );
};

export default App;
