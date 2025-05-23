import { useState } from "react";
import { puzzle, clone } from "./utils/sudoku.js";

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
      if (!isUnique(grid[i]) || !isUnique(grid.map((row) => row[i])))
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">🧩 Sudoku Game</h2>

        <div className="grid grid-cols-9 gap-[2px] border-2 border-black">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const thickTop = r % 3 === 0 ? "border-t-2" : "";
              const thickLeft = c % 3 === 0 ? "border-l-2" : "";
              const thickRight = (c + 1) % 3 === 0 ? "border-r-2" : "";
              const thickBottom = (r + 1) % 3 === 0 ? "border-b-2" : "";

              return (
                <input
                  key={`${r}-${c}`}
                  className={`w-10 h-10 text-center text-lg border outline-none focus:ring-2 focus:ring-blue-400 transition 
                    ${
                      isPreFilled(r, c)
                        ? "bg-gray-300 text-black font-semibold"
                        : "bg-white"
                    } 
                    ${thickTop} ${thickLeft} ${thickRight} ${thickBottom}`}
                  type="text"
                  maxLength="1"
                  value={cell === null ? "" : cell}
                  disabled={isPreFilled(r, c)}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                />
              );
            })
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={checkCompletion}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
          >
            ✅ Check
          </button>
          <button
            onClick={resetBoard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            🔄 Restart
          </button>
        </div>

        {completed && (
          <p className="mt-4 text-center text-green-600 font-bold text-lg">
            🎉 Congratulations! You solved it!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
