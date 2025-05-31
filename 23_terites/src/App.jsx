import React, { useState, useEffect, useCallback } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_BOARD = Array(BOARD_HEIGHT)
  .fill()
  .map(() => Array(BOARD_WIDTH).fill(0));

const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: "bg-cyan-500",
    shadow: "shadow-cyan-500/50",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-yellow-500",
    shadow: "shadow-yellow-500/50",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "bg-purple-500",
    shadow: "shadow-purple-500/50",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "bg-green-500",
    shadow: "shadow-green-500/50",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "bg-red-500",
    shadow: "shadow-red-500/50",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "bg-blue-500",
    shadow: "shadow-blue-500/50",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "bg-orange-500",
    shadow: "shadow-orange-500/50",
  },
};

function TetrisGame() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [holdPiece, setHoldPiece] = useState(null);
  const [canHold, setCanHold] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [clearedLines, setClearedLines] = useState([]);
  const [combo, setCombo] = useState(0);

  const getRandomPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape: TETROMINOS[randomPiece].shape,
      color: TETROMINOS[randomPiece].color,
      shadow: TETROMINOS[randomPiece].shadow,
      type: randomPiece,
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

  const calculateGhostPosition = useCallback(() => {
    if (!currentPiece) return { x: 0, y: 0 };

    let ghostY = position.y;
    while (isValidMove(currentPiece.shape, { x: position.x, y: ghostY + 1 })) {
      ghostY++;
    }
    return { x: position.x, y: ghostY };
  }, [currentPiece, position, isValidMove]);

  useEffect(() => {
    setGhostPosition(calculateGhostPosition());
  }, [calculateGhostPosition]);

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
      setClearedLines(completedLines);
      setCombo((prev) => prev + 1);

      setTimeout(() => {
        // Remove completed lines
        const boardAfterClear = newBoard.filter(
          (_, index) => !completedLines.includes(index)
        );
        // Add empty lines at the top
        const emptyLines = Array(completedLines.length)
          .fill()
          .map(() => Array(BOARD_WIDTH).fill(0));
        setBoard([...emptyLines, ...boardAfterClear]);
        setClearedLines([]);

        // Update score and lines with combo bonus
        const basePoints = [0, 40, 100, 300, 1200][completedLines.length];
        const comboBonus = combo * 50;
        const points = (basePoints + comboBonus) * level;
        setScore((prev) => {
          const newScore = prev + points;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });

        setLines((prev) => {
          const newLines = prev + completedLines.length;
          setLevel(Math.floor(newLines / 10) + 1);
          return newLines;
        });
      }, 300);
    } else {
      setCombo(0);
    }

    // Spawn new piece
    setCurrentPiece(nextPiece);
    setNextPiece(getRandomPiece());
    setCanHold(true);
    const newPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

    if (nextPiece && !isValidMove(nextPiece.shape, newPos)) {
      setGameOver(true);
    } else {
      setPosition(newPos);
    }
  }, [
    board,
    currentPiece,
    nextPiece,
    position,
    level,
    getRandomPiece,
    isValidMove,
    combo,
    highScore,
  ]);

  const holdCurrentPiece = useCallback(() => {
    if (!canHold || !currentPiece || gameOver || isPaused) return;

    if (holdPiece) {
      // Swap current and hold pieces
      const temp = currentPiece;
      setCurrentPiece(holdPiece);
      setHoldPiece(temp);
    } else {
      // Move current to hold, get next piece
      setHoldPiece(currentPiece);
      setCurrentPiece(nextPiece);
      setNextPiece(getRandomPiece());
    }

    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    setCanHold(false);
  }, [
    currentPiece,
    holdPiece,
    nextPiece,
    canHold,
    gameOver,
    isPaused,
    getRandomPiece,
  ]);

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

    let dropDistance = 0;
    let newY = position.y;
    while (isValidMove(currentPiece.shape, { x: position.x, y: newY + 1 })) {
      newY++;
      dropDistance++;
    }

    setScore((prev) => prev + dropDistance * 2); // Bonus points for hard drop
    setPosition({ x: position.x, y: newY });
    setTimeout(placePiece, 50);
  }, [currentPiece, position, isValidMove, placePiece, gameOver, isPaused]);

  const startGame = () => {
    setBoard(EMPTY_BOARD);
    setScore(0);
    setLevel(1);
    setLines(0);
    setCombo(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    setHoldPiece(null);
    setCanHold(true);
    setClearedLines([]);

    const firstPiece = getRandomPiece();
    const secondPiece = getRandomPiece();
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();

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
        case "a":
        case "A":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          movePiece(1, 0);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          movePiece(0, 1);
          break;
        case "ArrowUp":
        case "w":
        case "W":
          rotate();
          break;
        case " ":
          hardDrop();
          break;
        case "c":
        case "C":
          holdCurrentPiece();
          break;
        case "p":
        case "P":
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece, rotate, hardDrop, holdCurrentPiece, gameOver, gameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      const dropInterval = setInterval(() => {
        movePiece(0, 1);
      }, Math.max(50, 500 - (level - 1) * 30));

      return () => clearInterval(dropInterval);
    }
  }, [movePiece, level, gameStarted, gameOver, isPaused]);

  const renderPiece = (piece, small = false) => {
    if (!piece) return null;

    const size = small ? "w-3 h-3" : "w-4 h-4";
    return (
      <div className="flex flex-col items-center">
        {piece.shape.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={x}
                className={`${size} ${
                  cell
                    ? `${piece.color} ${piece.shadow} shadow-lg`
                    : "bg-transparent"
                } ${small ? "" : "border border-gray-700"}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    // Add ghost piece
    if (currentPiece && ghostPosition.y !== position.y) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardY = ghostPosition.y + y;
            const boardX = ghostPosition.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH &&
              displayBoard[boardY][boardX] === 0
            ) {
              displayBoard[boardY][boardX] = "ghost";
            }
          }
        }
      }
    }

    // Add current piece
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
          className={`w-6 h-6 border border-gray-600 transition-all duration-300 ${
            clearedLines.includes(y)
              ? "bg-white animate-pulse"
              : cell === 0
              ? "bg-gray-900"
              : cell === "ghost"
              ? "bg-gray-700 opacity-50 border-dashed"
              : `${cell} shadow-lg`
          }`}
        />
      ))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex items-center justify-center p-4">
      <div className="flex gap-6 items-start">
        {/* Hold Piece */}
        <div className="bg-gray-800 p-4 rounded-lg min-w-[120px] border border-gray-600">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 text-center">
            Hold
          </h3>
          <div className="h-16 flex items-center justify-center">
            {renderPiece(holdPiece, true)}
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Press C</p>
        </div>

        {/* Main Game Area */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            🧩 Tetris
          </h1>

          <div className="relative">
            <div className="grid grid-cols-10 gap-0 border-4 border-gray-600 bg-gray-800 p-3 rounded-xl shadow-2xl">
              {renderBoard()}
            </div>

            {!gameStarted && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-xl backdrop-blur-sm">
                <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-600">
                  <h2 className="text-2xl mb-4 text-purple-400 font-bold">
                    🎮 Ready to Play?
                  </h2>
                  <p className="mb-2">Press SPACE to Start</p>
                  <p className="text-sm text-gray-400">
                    Use WASD or Arrow Keys
                  </p>
                </div>
              </div>
            )}

            {isPaused && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-xl backdrop-blur-sm">
                <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-600">
                  <h2 className="text-2xl mb-4 text-yellow-400 font-bold">
                    ⏸️ PAUSED
                  </h2>
                  <p className="text-sm">Press P to resume</p>
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
                    <span className="text-green-400 font-bold">
                      {score.toLocaleString()}
                    </span>
                  </p>
                  <p className="mb-4 text-lg">
                    Level:{" "}
                    <span className="text-purple-400 font-bold">{level}</span>
                  </p>
                  {score === highScore && score > 0 && (
                    <p className="mb-4 text-yellow-400 font-bold animate-bounce">
                      🏆 New High Score!
                    </p>
                  )}
                  <p className="text-sm text-gray-400">
                    Press SPACE to restart
                  </p>
                </div>
              </div>
            )}
          </div>

          {combo > 1 && (
            <div className="mt-2 text-yellow-400 font-bold animate-bounce">
              🔥 {combo}x COMBO! 🔥
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Next Piece */}
          <div className="bg-gray-800 p-4 rounded-lg min-w-[120px] border border-gray-600">
            <h3 className="text-lg font-semibold text-purple-400 mb-3 text-center">
              Next
            </h3>
            <div className="h-16 flex items-center justify-center">
              {renderPiece(nextPiece, true)}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-800 p-4 rounded-lg min-w-[200px] border border-gray-600">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-purple-400">Score</h3>
                <p className="text-2xl font-bold text-green-400">
                  {score.toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-400">
                  High Score
                </h3>
                <p className="text-xl font-bold text-yellow-400">
                  {highScore.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-purple-400">
                    Level
                  </h3>
                  <p className="text-xl font-bold">{level}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-purple-400">
                    Lines
                  </h3>
                  <p className="text-xl font-bold">{lines}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">
                  Controls:
                </h4>
                <div className="text-xs text-gray-300 space-y-1">
                  <p>🎮 WASD/Arrows: Move</p>
                  <p>⬆️ W/↑: Rotate</p>
                  <p>⬇️ S/↓: Soft drop</p>
                  <p>🚀 Space: Hard drop</p>
                  <p>📦 C: Hold piece</p>
                  <p>⏸️ P: Pause</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TetrisGame;
