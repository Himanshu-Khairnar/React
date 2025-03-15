import React, { useState, useEffect } from "react";

const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Crypto Price Tracker 💰</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Coin</th>
              <th className="p-2">Price (USD)</th>
              <th className="p-2">Market Cap</th>
              <th className="p-2">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border border-gray-300">
                <td className="p-2 flex items-center justify-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                  />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </td>
                <td className="p-2">${coin.current_price.toLocaleString()}</td>
                <td className="p-2">${coin.market_cap.toLocaleString()}</td>
                <td
                  className={`p-2 ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoTracker;
