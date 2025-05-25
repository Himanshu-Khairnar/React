import React, { useState, useEffect, useCallback } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0); // Changed: No localStorage

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
      ) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore); // Changed: Direct state update
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood, highScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && e.key === " ") {
        setGameStarted(true);
        return;
      }

      if (gameOver && e.key === " ") {
        resetGame();
        setGameStarted(true); // Added: Auto-start after reset
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault(); // Prevent page scrolling
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          e.preventDefault();
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          e.preventDefault();
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, gameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameInterval = setInterval(moveSnake, 150);
      return () => clearInterval(gameInterval);
    }
  }, [moveSnake, gameStarted, gameOver]);

  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnake = snake.some(
          (segment) => segment.x === x && segment.y === y
        );
        const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;

        board.push(
          <div
            key={`${x}-${y}`}
            className={`w-4 h-4 border border-gray-800 ${
              isFood
                ? "bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"
                : isHead
                ? "bg-green-300 rounded-sm shadow-lg shadow-green-300/50"
                : isSnake
                ? "bg-green-600 rounded-sm"
                : "bg-gray-900"
            }`}
          />
        );
      }
    }
    return board;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        🐍 Snake Game
      </h1>

      <div className="flex gap-8 mb-4">
        <div className="text-xl font-semibold bg-gray-800 px-4 py-2 rounded-lg">
          Score: <span className="text-green-400">{score}</span>
        </div>
        <div className="text-xl font-semibold bg-gray-800 px-4 py-2 rounded-lg">
          High Score: <span className="text-yellow-400">{highScore}</span>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-20 gap-0 border-2 border-gray-600 bg-gray-800 p-2 rounded-lg shadow-2xl">
          {renderBoard()}
        </div>

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-2xl mb-4 font-bold text-green-400">
                Ready to Play?
              </h2>
              <p className="mb-4 text-lg">Press SPACE to start</p>
              <p className="text-sm text-gray-400">
                Use arrow keys to control the snake
              </p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-2xl mb-4 text-red-400 font-bold">
                Game Over!
              </h2>
              <p className="mb-2 text-lg">
                Final Score:{" "}
                <span className="text-green-400 font-bold">{score}</span>
              </p>
              <p className="mb-4 text-lg">
                Length:{" "}
                <span className="text-blue-400 font-bold">{snake.length}</span>
              </p>
              {score === highScore && score > 0 && (
                <p className="mb-4 text-yellow-400 font-bold animate-pulse">
                  🏆 New High Score!
                </p>
              )}
              <p className="text-sm text-gray-400">Press SPACE to play again</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-gray-400 space-y-1">
        <p>🎮 Use arrow keys to move</p>
        <p>🍎 Eat food to grow and score points</p>
        <p>⚠️ Don't hit walls or yourself!</p>
        <p className="text-xs">Snake Length: {snake.length}</p>
      </div>
    </div>
  );
}

export default SnakeGame;
