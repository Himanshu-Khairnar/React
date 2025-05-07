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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🎯 Emoji Mood Tracker
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className={`flex flex-col items-center p-4 rounded-xl shadow transition-all duration-300 ${
              selectedMood?.label === mood.label
                ? "bg-blue-500 text-white scale-105 ring-2 ring-blue-300"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className="text-sm font-medium mt-2">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📅 Mood History
        </h2>
        <ul className="space-y-2 max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-300">
          {Object.entries(moodLogs)
            .sort((a, b) => new Date(b[0]) - new Date(a[0])) // Sort descending
            .map(([date, mood]) => {
              const isToday = date === new Date().toISOString().split("T")[0];
              return (
                <li
                  key={date}
                  className={`flex justify-between items-center p-2 rounded-md ${
                    isToday
                      ? "bg-yellow-100 font-bold animate-pulse"
                      : "bg-gray-50"
                  }`}
                >
                  <span>{date}</span>
                  <span className="text-xl">
                    {mood.emoji} {mood.label}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MoodTracker;
