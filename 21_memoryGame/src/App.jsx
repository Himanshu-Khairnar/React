import React, { useState, useEffect } from "react";
import "./App.css"; 
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

  useEffect(() => {
    setCards(shuffleArray(emojis));
  }, []);

  useEffect(() => {
    if (firstPick && secondPick) {
      if (firstPick.emoji === secondPick.emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.emoji === firstPick.emoji ? { ...card, matched: true } : card
          )
        );
        setScores((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
          setTurn((prev) => (prev === "A" ? "B" : "A"));
        }, 1000);
      }
    }
  }, [firstPick, secondPick]);

  const handleCardClick = (card) => {
    if (!card.flipped && !card.matched && (!firstPick || !secondPick)) {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
      firstPick ? setSecondPick(card) : setFirstPick(card);
    }
  };

  const resetTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setCards((prev) =>
      prev.map((card) => (card.matched ? card : { ...card, flipped: false }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-black text-white flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl mb-6 font-bold text-gradient bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Emoji Memory Duel
      </h1>

      <div className="flex justify-between w-full max-w-md text-lg mb-6">
        <div
          className={`px-4 py-2 rounded ${
            turn === "A"
              ? "bg-green-500 text-white font-bold"
              : "bg-neutral-800"
          } transition duration-300`}
        >
          Player A: {scores.A}
        </div>
        <div
          className={`px-4 py-2 rounded ${
            turn === "B" ? "bg-pink-500 text-white font-bold" : "bg-neutral-800"
          } transition duration-300`}
        >
          Player B: {scores.B}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-xl">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-20 h-20 sm:w-24 sm:h-24 perspective`}
            onClick={() => handleCardClick(card)}
          >
            <div
              className={`card w-full h-full rounded-xl shadow-lg transition-transform duration-500 ${
                card.flipped || card.matched ? "flipped" : ""
              }`}
            >
              <div className="card-front bg-neutral-700 flex items-center justify-center text-3xl">
                {card.emoji}
              </div>
              <div className="card-back bg-neutral-900 border border-neutral-600 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
