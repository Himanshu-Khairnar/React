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
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-8">
      <h1 className="text-3xl mb-4 font-bold">Emoji Memory Duel</h1>
      <div className="flex justify-between w-full max-w-xl text-xl mb-4">
        <div className={turn === "A" ? "font-bold text-green-400" : ""}>
          Player A: {scores.A}
        </div>
        <div className={turn === "B" ? "font-bold text-pink-400" : ""}>
          Player B: {scores.B}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`w-20 h-20 flex items-center justify-center text-3xl border border-gray-500 rounded cursor-pointer bg-neutral-800 hover:bg-neutral-700 ${
              card.flipped || card.matched ? "" : "text-transparent"
            }`}
            onClick={() => handleCardClick(card)}
          >
            {card.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
