import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">E-Commerce Dashboard</h1>

        <button
          className="text-white text-sm md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`fixed top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent md:static md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible md:opacity-100 md:visible"
          }`}
        >
          <Link
            to="/"
            className="block md:inline text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-300"
            onClick={handleMenuItemClick}
          >
            Home
          </Link>
          <Link
            to="/product/1"
            className="block md:inline text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-300"
            onClick={handleMenuItemClick}
          >
            Product Details
          </Link>
          <Link
            to="/cart"
            className="block md:inline text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-300"
            onClick={handleMenuItemClick}
          >
            Shopping Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
