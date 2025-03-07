import React, { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0987654321";
    if (charAllowed) str += "!@#$%^&*()_+{}[]`~/><";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length); // Fixed Index Selection
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.selectSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  }, [password]);

  // Generate password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, charAllowed, numberAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500">
      <h1 className="text-xl font-bold text-center">Password Generator</h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-white border p-2 w-full rounded"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className="outline-none bg-orange-500 text-white px-3 py-0.5 shrink-0 rounded-lg hover:scale-105 hover:bg-orange-600"
        >
          Copy
        </button>
      </div>
      {/* Number and Special Character Toggles */}
      <div className="flex justify-between my-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <span className="ml-2">Include Numbers</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <span className="ml-2">Include Symbols</span>
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
        className="bg-orange-500 text-white px-4 py-2 mt-3 w-full rounded hover:bg-orange-600"
        onClick={passwordGenerator}
      >
        Generate Password
      </button>
    </div>
  );
}
