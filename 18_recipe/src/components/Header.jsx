import { Coffee, Search, Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const SearchRecipes = (e) => {
    if (e.key === "Enter") {
      navigate(`/searchRecipe?value=${search}`);
      setSearch("");
    }
  };
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

        <ul className="hidden lg:flex gap-14 text-2xl font-medium">
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

        <div className="relative hidden lg:block">
          <Search className="absolute top-2 left-3 text-gray-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Recipe"
            className="w-52 p-2 pl-10 rounded-full bg-white border border-gray-300 focus:outline-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => SearchRecipes(e)}
          />
        </div>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-8 h-8 text-primary" />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 items-center bg-white py-4 shadow-lg transition-transform">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => SearchRecipes(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
