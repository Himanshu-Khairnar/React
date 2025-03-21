import React, { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [strength, setStrength] = useState("Weak");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const determineStrength = (pass) => {
    let strengthLevel = "Weak";
    if (
      pass.length > 8 &&
      /[A-Z]/.test(pass) &&
      /\d/.test(pass) &&
      /[!@#$%^&*]/.test(pass)
    ) {
      strengthLevel = "Strong";
    } else if (pass.length >= 6 && /[A-Z]/.test(pass)) {
      strengthLevel = "Medium";
    }
    setStrength(strengthLevel);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0987654321";
    if (charAllowed) str += "!@#$%^&*()_+{}[]`~/><";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    determineStrength(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, charAllowed, numberAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 my-8 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-center mb-4">
        🔒 Password Generator
      </h1>
      <div className="relative flex gap-2 items-center">
        <input
          type={showPassword ? "text" : "password"}
          className="bg-gray-800 border border-gray-600 p-2 w-full rounded text-lg"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-gray-400"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        <button
          onClick={copyPassword}
          className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:scale-105 hover:bg-orange-600"
        >
          {copied ? "✅ Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-3 text-sm text-center">
        Strength:{" "}
        <span
          className={
            strength === "Strong"
              ? "text-green-400"
              : strength === "Medium"
              ? "text-yellow-400"
              : "text-red-400"
          }
        >
          {strength}
        </span>
      </div>

      <div className="flex justify-between my-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="mr-2"
          />
          Include Numbers
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="mr-2"
          />
          Include Symbols
        </label>
      </div>

      <div className="flex items-center justify-between">
        <label>Password Length: {length}</label>
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="cursor-pointer"
        />
      </div>

      <button
        className="bg-orange-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-orange-600"
        onClick={passwordGenerator}
      >
        🔄 Generate New Password
      </button>
    </div>
  );
}
