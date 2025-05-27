import React, { useState, useEffect, useCallback } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_BOARD = Array(BOARD_HEIGHT)
  .fill()
  .map(() => Array(BOARD_WIDTH).fill(0));

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: "bg-cyan-500" },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-yellow-500",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "bg-purple-500",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "bg-green-500",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "bg-red-500",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "bg-blue-500",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "bg-orange-500",
  },
};

function TetrisGame() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const getRandomPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape: TETROMINOS[randomPiece].shape,
      color: TETROMINOS[randomPiece].color,
    };
  }, []);

  const rotatePiece = (piece) => {
    const rotated = piece[0].map((_, index) =>
      piece.map((row) => row[index]).reverse()
    );
    return rotated;
  };

  const isValidMove = useCallback(
    (piece, pos) => {
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (piece[y][x] !== 0) {
            const newX = pos.x + x;
            const newY = pos.y + y;

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return false;
            }

            if (newY >= 0 && board[newY][newX] !== 0) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [board]
  );

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map((row) => [...row]);

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    setBoard(newBoard);

    // Check for completed lines
    const completedLines = [];
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every((cell) => cell !== 0)) {
        completedLines.push(y);
      }
    }

    if (completedLines.length > 0) {
      // Remove completed lines
      const boardAfterClear = newBoard.filter(
        (_, index) => !completedLines.includes(index)
      );
      // Add empty lines at the top
      const emptyLines = Array(completedLines.length)
        .fill()
        .map(() => Array(BOARD_WIDTH).fill(0));
      setBoard([...emptyLines, ...boardAfterClear]);

      // Update score and lines
      const points = [0, 40, 100, 300, 1200][completedLines.length] * level;
      setScore((prev) => prev + points);
      setLines((prev) => {
        const newLines = prev + completedLines.length;
        setLevel(Math.floor(newLines / 10) + 1);
        return newLines;
      });
    }

    // Spawn new piece
    const newPiece = getRandomPiece();
    const newPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

    if (!isValidMove(newPiece.shape, newPos)) {
      setGameOver(true);
    } else {
      setCurrentPiece(newPiece);
      setPosition(newPos);
    }
  }, [board, currentPiece, position, level, getRandomPiece, isValidMove]);

  const movePiece = useCallback(
    (dx, dy) => {
      if (!currentPiece || gameOver || isPaused) return;

      const newPos = { x: position.x + dx, y: position.y + dy };

      if (isValidMove(currentPiece.shape, newPos)) {
        setPosition(newPos);
      } else if (dy > 0) {
        placePiece();
      }
    },
    [currentPiece, position, isValidMove, placePiece, gameOver, isPaused]
  );

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotated = rotatePiece(currentPiece.shape);
    if (isValidMove(rotated, position)) {
      setCurrentPiece((prev) => ({ ...prev, shape: rotated }));
    }
  }, [currentPiece, position, isValidMove, gameOver, isPaused]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = position.y;
    while (isValidMove(currentPiece.shape, { x: position.x, y: newY + 1 })) {
      newY++;
    }
    setPosition({ x: position.x, y: newY });
    setTimeout(placePiece, 50);
  }, [currentPiece, position, isValidMove, placePiece, gameOver, isPaused]);

  const startGame = () => {
    setBoard(EMPTY_BOARD);
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);

    const firstPiece = getRandomPiece();
    setCurrentPiece(firstPiece);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) {
        if (e.key === " ") startGame();
        return;
      }

      if (!gameStarted) {
        if (e.key === " ") startGame();
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          movePiece(1, 0);
          break;
        case "ArrowDown":
          movePiece(0, 1);
          break;
        case "ArrowUp":
          rotate();
          break;
        case " ":
          hardDrop();
          break;
        case "p":
        case "P":
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece, rotate, hardDrop, gameOver, gameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      const dropInterval = setInterval(() => {
        movePiece(0, 1);
      }, Math.max(50, 500 - (level - 1) * 50));

      return () => clearInterval(dropInterval);
    }
  }, [movePiece, level, gameStarted, gameOver, isPaused]);

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    // Add current piece to display
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) =>
      row.map((cell, x) => (
        <div
          key={`${x}-${y}`}
          className={`w-6 h-6 border border-gray-600 ${
            cell === 0 ? "bg-gray-900" : cell
          }`}
        />
      ))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white flex items-center justify-center p-4">
      <div className="flex gap-8 items-start">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            🧩 Tetris
          </h1>

          <div className="relative">
            <div className="grid grid-cols-10 gap-0 border-2 border-gray-600 bg-gray-800 p-2 rounded-lg">
              {renderBoard()}
            </div>

            {!gameStarted && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl mb-4">Press SPACE to Start</h2>
                </div>
              </div>
            )}

            {isPaused && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl mb-4">PAUSED</h2>
                  <p className="text-sm">Press P to resume</p>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl mb-4 text-red-400">Game Over!</h2>
                  <p className="mb-4">Final Score: {score}</p>
                  <p className="text-sm">Press SPACE to restart</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg min-w-[200px]">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-400">Score</h3>
              <p className="text-2xl font-bold">{score.toLocaleString()}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-400">Level</h3>
              <p className="text-2xl font-bold">{level}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-400">Lines</h3>
              <p className="text-2xl font-bold">{lines}</p>
            </div>

            <div className="mt-6 text-sm text-gray-300 space-y-1">
              <p>🎮 Controls:</p>
              <p>← → Move</p>
              <p>↓ Soft drop</p>
              <p>↑ Rotate</p>
              <p>Space: Hard drop</p>
              <p>P: Pause</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TetrisGame;
