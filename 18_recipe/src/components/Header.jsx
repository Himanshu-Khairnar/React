import { Coffee, Search, Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="h-3 bg-primary" />

      {/* Header Container */}
      <div className="flex items-center justify-between p-5 md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Coffee className="w-7 h-7 text-primary" />
          <h2 className="text-xl font-medium font-mono">
            Delights at the Table
          </h2>
        </div>

        <ul className="hidden md:flex gap-6 text-2xl font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-black"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/recipe"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-black"
            }
          >
            Recipe's 🇮🇳
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-black"
            }
          >
            About Us
          </NavLink>
        </ul>

        <div className="relative hidden md:block">
          <Search className="absolute top-2 left-3 text-gray-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Recipe"
            className="w-52 p-2 pl-10 rounded-full bg-white border border-gray-300 focus:outline-primary"
          />
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-8 h-8 text-primary" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 items-center bg-white py-4 shadow-lg">
          <NavLink
            to="/"
            className="text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/recipe"
            className="text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Recipe
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </NavLink>
          <div className="relative mt-2">
            <Search className="absolute top-2 left-3 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Recipe"
              className="w-52 p-2 pl-10 rounded-full bg-white border border-gray-300 focus:outline-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}
