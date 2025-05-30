import React, { useState, useEffect, useCallback } from "react";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEEDS = {
  Easy: 200,
  Normal: 150,
  Hard: 100,
  Insane: 50,
};

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState("Normal");
  const [gameSpeed, setGameSpeed] = useState(SPEEDS.Normal);
  const [showSettings, setShowSettings] = useState(false);

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
    setIsPaused(false);
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setGameSpeed(SPEEDS[newDifficulty]);
    setShowSettings(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || isPaused) return;

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
          const basePoints = 10;
          const difficultyMultiplier = {
            Easy: 1,
            Normal: 1.5,
            Hard: 2,
            Insane: 3,
          };
          const newScore =
            prev + Math.floor(basePoints * difficultyMultiplier[difficulty]);
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [
    direction,
    food,
    gameOver,
    gameStarted,
    isPaused,
    generateFood,
    highScore,
    difficulty,
  ]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && e.key === " ") {
        setGameStarted(true);
        return;
      }

      if (gameOver && e.key === " ") {
        resetGame();
        setGameStarted(true);
        return;
      }

      if (e.key === "p" || e.key === "P") {
        togglePause();
        return;
      }

      if (e.key === "Escape") {
        setShowSettings(!showSettings);
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
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
  }, [direction, gameOver, gameStarted, isPaused, showSettings]);

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      const gameInterval = setInterval(moveSnake, gameSpeed);
      return () => clearInterval(gameInterval);
    }
  }, [moveSnake, gameStarted, gameOver, isPaused, gameSpeed]);

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
            className={`w-4 h-4 border border-gray-800 transition-all duration-100 ${
              isFood
                ? "bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 scale-110"
                : isHead
                ? "bg-green-300 rounded-sm shadow-lg shadow-green-300/50 scale-105"
                : isSnake
                ? "bg-green-600 rounded-sm"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          />
        );
      }
    }
    return board;
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Normal":
        return "text-blue-400";
      case "Hard":
        return "text-orange-400";
      case "Insane":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
        >
          ⚙️ Settings
        </button>
        {gameStarted && !gameOver && (
          <button
            onClick={togglePause}
            className="bg-yellow-600 hover:bg-yellow-500 px-3 py-2 rounded-lg transition-colors font-bold"
          >
            {isPaused ? "▶️ Resume" : "⏸️ Pause"}
          </button>
        )}
      </div>

      {showSettings && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-600 z-10">
          <h3 className="text-lg font-bold mb-3">Difficulty</h3>
          {Object.keys(SPEEDS).map((diff) => (
            <button
              key={diff}
              onClick={() => changeDifficulty(diff)}
              className={`block w-full text-left px-3 py-2 rounded mb-1 transition-colors ${
                difficulty === diff
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      )}

      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
        🐍 Snake Game
      </h1>

      <div className="flex gap-6 mb-6">
        <div className="text-xl font-semibold bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
          Score: <span className="text-green-400 font-bold">{score}</span>
        </div>
        <div className="text-xl font-semibold bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
          High Score:{" "}
          <span className="text-yellow-400 font-bold">{highScore}</span>
        </div>
        <div className="text-xl font-semibold bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
          Difficulty:{" "}
          <span className={`font-bold ${getDifficultyColor()}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-20 gap-0 border-4 border-gray-600 bg-gray-800 p-3 rounded-xl shadow-2xl">
          {renderBoard()}
        </div>

        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-xl backdrop-blur-sm">
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-600">
              <h2 className="text-3xl mb-4 font-bold text-green-400 animate-bounce">
                🎮 Ready to Play?
              </h2>
              <p className="mb-4 text-xl">Press SPACE to start</p>
              <p className="text-sm text-gray-400 mb-2">
                Current difficulty:{" "}
                <span className={getDifficultyColor()}>{difficulty}</span>
              </p>
              <p className="text-sm text-gray-400">
                Use arrow keys to control the snake
              </p>
            </div>
          </div>
        )}

        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-xl backdrop-blur-sm">
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-600">
              <h2 className="text-3xl mb-4 text-yellow-400 font-bold">
                ⏸️ Game Paused
              </h2>
              <p className="text-lg mb-2">Press P to resume</p>
              <p className="text-sm text-gray-400">or ESC for settings</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-xl backdrop-blur-sm">
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-600">
              <h2 className="text-3xl mb-4 text-red-400 font-bold animate-pulse">
                💀 Game Over!
              </h2>
              <p className="mb-2 text-xl">
                Final Score:{" "}
                <span className="text-green-400 font-bold">{score}</span>
              </p>
              <p className="mb-4 text-xl">
                Snake Length:{" "}
                <span className="text-blue-400 font-bold">{snake.length}</span>
              </p>
              <p className="mb-4 text-lg">
                Difficulty:{" "}
                <span className={getDifficultyColor()}>{difficulty}</span>
              </p>
              {score === highScore && score > 0 && (
                <p className="mb-4 text-yellow-400 font-bold animate-bounce text-xl">
                  🏆 New High Score! 🏆
                </p>
              )}
              <p className="text-sm text-gray-400">Press SPACE to play again</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-gray-400 bg-gray-800 p-4 rounded-lg max-w-md">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>🎮 Arrow keys: Move</p>
            <p>
              🍎 Snake Length:{" "}
              <span className="text-green-400 font-bold">{snake.length}</span>
            </p>
          </div>
          <div>
            <p>P: Pause/Resume</p>
            <p>ESC: Settings</p>
          </div>
        </div>
        <p className="text-xs mt-2 text-gray-500">
          💡 Higher difficulty = More points per food!
        </p>
      </div>
    </div>
  );
}

export default SnakeGame;
