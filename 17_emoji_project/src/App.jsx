import React, { useState, useEffect } from "react";

const moods = [
  { emoji: "😀", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😌", label: "Relaxed" },
  { emoji: "🤩", label: "Excited" },
];

const getStoredMoods = () => JSON.parse(localStorage.getItem("moodLogs")) || {};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodLogs, setMoodLogs] = useState(getStoredMoods());

  useEffect(() => {
    localStorage.setItem("moodLogs", JSON.stringify(moodLogs));
  }, [moodLogs]);

  const handleMoodSelect = (mood) => {
    const today = new Date().toISOString().split("T")[0];
    setMoodLogs({ ...moodLogs, [today]: mood });
    setSelectedMood(mood);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Emoji Mood Tracker</h1>
      <div className="flex gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className={`p-4 text-3xl border rounded-lg shadow-md ${
              selectedMood?.label === mood.label ? "bg-blue-300" : "bg-white"
            }`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      <h2 className="mt-6 text-xl font-semibold">Your Mood History</h2>
      <ul className="mt-2">
        {Object.entries(moodLogs).map(([date, mood]) => (
          <li key={date} className="text-lg">
            {date}: {mood.emoji} {mood.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodTracker;
