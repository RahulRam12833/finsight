import React from "react";

import "./Navbar.css";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <img alt="" />
          <div className="hidden font-bold lg:flex">
            <a href="" className="text-black hover:text-blue-800">
              Dashboard
            </a>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <div className="hover:text-blue-800">Login</div>
          <a
            href=""
            className="px-8 py-3 font-bold rounded text-white bg-green-400 hover:opacity-70"
          >
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
