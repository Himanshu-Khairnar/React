export default function ProductCard() {
  const rating = 4;

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl">
      <a href="/">
        <img
          className="w-full h-60 object-cover"
          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="product"
        />
      </a>

      <div className="p-6">
        <a href="/">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:underline line-clamp-2">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </a>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              fill="currentColor"
              viewBox="0 0 22 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.924 7.625a1.52 1.52 0 00-1.238-1.044l-5.051-.734-2.26-4.577a1.53 1.53 0 00-2.75 0L7.366 5.847l-5.05.734a1.54 1.54 0 00-.873 2.631l3.656 3.563-.862 5.031a1.53 1.53 0 002.225 1.616L11 17.033l4.518 2.375a1.53 1.53 0 002.225-1.617l-.862-5.03 3.656-3.563a1.52 1.52 0 00.387-1.575z" />
            </svg>
          ))}
          <span className="ml-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            {rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <a
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}
