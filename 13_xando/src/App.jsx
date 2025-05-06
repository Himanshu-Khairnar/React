import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of winningCombinations) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-4">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide text-blue-400 drop-shadow-md">
        Tic Tac Toe
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 text-3xl font-extrabold rounded-lg shadow-inner flex items-center justify-center bg-gray-700 hover:bg-gray-600 active:scale-95 transition-transform duration-150 ease-in-out"
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="mt-6 text-lg text-center">
          {winner ? (
            <p className="text-green-400 text-2xl font-bold animate-pulse">
              🎉 Winner: {winner} 🎉
            </p>
          ) : (
            <p className="text-blue-300">Current Turn: {isXTurn ? "X" : "O"}</p>
          )}
        </div>
        <button
          onClick={resetGame}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-semibold shadow-md"
        >
          🔁 Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
