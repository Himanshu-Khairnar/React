import React, { useState } from "react";
import InputBox from "./Components/InputBox.jsx";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertAmount, setConvertAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertAmount);
    setConvertAmount(amount);
  };

  const convert = () => {
    setConvertAmount(amount * (currencyInfo[to] || 1));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat bg-gray-900">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-6 backdrop-blur-md bg-white/40 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-4"
        >
          {/* From Input */}
          <InputBox
            label="From"
            amount={amount}
            currencyOption={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={setAmount}
          />

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="border-2 border-gray-300 rounded-full bg-blue-600 text-white px-4 py-1 text-sm font-semibold shadow-md transition-transform hover:scale-105"
              onClick={swap}
            >
              Swap ⬇⬆
            </button>
          </div>

          {/* To Input */}
          <InputBox
            label="To"
            amount={convertAmount}
            currencyOption={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisabled
          />

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}
