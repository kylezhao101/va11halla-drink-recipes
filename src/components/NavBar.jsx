import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mb-4 font-body">
      <div>
        <NavLink to="/HomePage" className="text-white text-lg">
          B.T.C. Recipe Book
        </NavLink>
      </div>
      <div>
        <NavLink to="/AuthPage" className="text-red-interactive text-lg mr-4">Login/Signup</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;