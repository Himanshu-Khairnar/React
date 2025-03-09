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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 text-2xl font-bold flex items-center justify-center bg-gray-700 border-2 border-gray-600 rounded-md hover:bg-gray-600"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <p className="mt-4 text-xl font-semibold">Winner: {winner}</p>}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
