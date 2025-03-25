import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOption = [],
  selectCurrency = "usd",
  currencyDisabled = false,
  amountDisabled = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md text-sm flex items-center gap-4 ${className}`}
    >
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-gray-500 text-xs font-medium block mb-1"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          placeholder="Enter amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-1/2 text-right">
        <label className="text-gray-500 text-xs font-medium block mb-1">
          Currency
        </label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOption.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
