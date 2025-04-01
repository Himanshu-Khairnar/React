import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerTitle = [
    "Home",
    "What is GPT?",
    "Open AI",
    "Case Studies",
    "Library",
  ];

  return (
    <div className="bg-gradient-to-r from-gradient-color to-primary  relative    h-[100px]">
      <div className="h-16 md:h-20 px-4 md:px-6 lg:px-10 xl:px-25 flex items-center justify-between text-white">
        <ul className="flex items-center">
          <li>
            <img
              src="GPT-3.svg"
              alt="GPT-3 Logo"
              className="h-5 mr-2 md:mr-4"
            />
          </li>
          {headerTitle.map((item) => (
            <li
              className="hidden md:block text-sm lg:text-base ml-4 lg:ml-6 xl:ml-10"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:block text-sm lg:text-base">
            Sign in
          </button>
          <button className="bg-orange-600 text-sm px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 xl:px-10 xl:py-4 rounded">
            Sign up
          </button>
          <button
            className="md:hidden ml-2 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-primary z-10 shadow-lg">
          <ul className="py-4 px-6">
            {headerTitle.map((item) => (
              <li className="py-2 text-white" key={item}>
                {item}
              </li>
            ))}
            <li className="py-2 text-white mt-4 border-t border-gray-700 pt-4">
              Sign in
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
