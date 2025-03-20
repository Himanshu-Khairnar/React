import React, { useState, useEffect } from "react";

const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10; // Coins per page

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
      );
      const data = await response.json();
      setCoins(data);
      setTotalPages(Math.ceil(100 / perPage)); // Assuming API returns 100 coins
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [page]);

  // Handle search filter
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-center max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Crypto Price Tracker 💰
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a coin..."
        className="p-3 border border-gray-200 rounded-lg mb-6 w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 text-left font-semibold">Coin</th>
                  <th className="p-4 text-left font-semibold">Price (USD)</th>
                  <th className="p-4 text-left font-semibold">Market Cap</th>
                  <th className="p-4 text-left font-semibold">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-4 flex items-center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-7 h-7 mr-3 rounded-full"
                      />
                      <span className="font-medium text-gray-800">
                        {coin.name}{" "}
                        <span className="text-gray-500">
                          ({coin.symbol.toUpperCase()})
                        </span>
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-700">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                    <td
                      className={`p-4 font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 shadow-md"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-lg font-medium text-gray-700">
              {`Page ${page} of ${totalPages}`}
            </span>
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 shadow-md"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoTracker;
