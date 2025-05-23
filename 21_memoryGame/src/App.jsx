import React, { useState, useEffect } from "react";

const emojis = ["🐶", "🍕", "🚀", "🌈", "🎲", "🎮", "🧠", "🍩"];

const shuffleArray = (array) => {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
};

function App() {
  const [cards, setCards] = useState([]);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [turn, setTurn] = useState("A");
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    setCards(shuffleArray(emojis));
  }, []);

  useEffect(() => {
    if (firstPick && secondPick) {
      setIsComparing(true);

      if (firstPick.emoji === secondPick.emoji) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.emoji === firstPick.emoji ? { ...card, matched: true } : card
            )
          );
          setScores((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));
          resetTurn();
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          resetTurn();
          setTurn((prev) => (prev === "A" ? "B" : "A"));
        }, 1000);
      }
    }
  }, [firstPick, secondPick, turn]);

  const handleCardClick = (card) => {
    if (isComparing || card.flipped || card.matched) return;

    if (!firstPick) {
      setFirstPick(card);
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
    } else if (!secondPick && card.id !== firstPick.id) {
      setSecondPick(card);
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
    }
  };

  const resetTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setIsComparing(false);
    setCards((prev) =>
      prev.map((card) => (card.matched ? card : { ...card, flipped: false }))
    );
  };

  const resetGame = () => {
    setCards(shuffleArray(emojis));
    setFirstPick(null);
    setSecondPick(null);
    setTurn("A");
    setScores({ A: 0, B: 0 });
    setIsComparing(false);
  };

  const gameOver = cards.length > 0 && cards.every((card) => card.matched);
  const winner = gameOver
    ? scores.A > scores.B
      ? "A"
      : scores.B > scores.A
      ? "B"
      : "Tie"
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-black text-white flex flex-col items-center py-8 px-4">
      <style jsx>{`
        .card-container {
          perspective: 1000px;
          cursor: pointer;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card-flipped .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-front {
          background: linear-gradient(135deg, #374151, #1f2937);
          border: 2px solid #4b5563;
        }

        .card-back {
          background: linear-gradient(135deg, #059669, #047857);
          transform: rotateY(180deg);
          font-size: 2rem;
        }

        .card-matched {
          opacity: 0.6;
          transform: scale(0.95);
        }
      `}</style>

      <h1 className="text-4xl mb-6 font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Emoji Memory Duel
      </h1>

      <div className="flex justify-between w-full max-w-md text-lg mb-6">
        <div
          className={`px-4 py-2 rounded transition-all duration-300 ${
            turn === "A"
              ? "bg-green-500 text-white font-bold shadow-lg"
              : "bg-neutral-800"
          }`}
        >
          Player A: {scores.A}
        </div>
        <div
          className={`px-4 py-2 rounded transition-all duration-300 ${
            turn === "B"
              ? "bg-pink-500 text-white font-bold shadow-lg"
              : "bg-neutral-800"
          }`}
        >
          Player B: {scores.B}
        </div>
      </div>

      {gameOver && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            {winner === "Tie" ? "It's a Tie!" : `Player ${winner} Wins!`}
          </h2>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-xl">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card-container w-20 h-20 sm:w-24 sm:h-24 ${
              card.flipped || card.matched ? "card-flipped" : ""
            } ${card.matched ? "card-matched" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="w-4 h-4 bg-white rounded-full opacity-30"></div>
              </div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-neutral-400">
        <p>Current turn: Player {turn}</p>
        {isComparing && <p className="text-yellow-400">Comparing cards...</p>}
      </div>
    </div>
  );
}

export default App;
