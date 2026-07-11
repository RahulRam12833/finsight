import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <span className="font-bold text-lg">FinSight</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/search" className="text-black hover:text-blue-800">
            Search
          </Link>
          {isLoggedIn() ? (
            <div className="hidden lg:flex items-center space-x-6">
              <div className="hover:text-blue-800">
                Welcome, {user?.userName}
              </div>
              <button
                onClick={logout}
                className="px-6 py-2 font-bold rounded text-white bg-green-400 hover:opacity-70"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/login" className="hover:text-blue-800">
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 font-bold rounded text-white bg-green-400 hover:opacity-70"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col  space-y-1"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col space-y-1">
          <Link to="/search" className="text-black hover:text-blue-800">
            Search
          </Link>
          {isLoggedIn() ? (
            <div className="lg:hidden mt-4 flex flex-col space-y-1">
              <div className="hover:text-blue-800">
                Welcome, {user?.userName}
              </div>
              <button
                onClick={logout}
                className="px-6 py-2 font-bold rounded text-white bg-green-400 hover:opacity-70"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="lg:hidden mt-4 flex flex-col space-y-1">
              <Link to="/login" className="hover:text-blue-800">
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 font-bold rounded text-white bg-green-400 hover:opacity-70"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
