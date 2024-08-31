import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className=" bg-rose-950 p-2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-xl ml-3 font-bold">
          Eats's & Share's
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/create" className="text-white mr-4">
                Create a Recipe
              </Link>
              <Link to="/my-recipes" className="text-white mr-4">
                My Recipes
              </Link>
              <a
                href="#"
                className="text-white mr-4 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white border px-2 py-1 rounded-md mr-4">
                Login
              </Link>
              <Link to="/signup" className="text-white mr-4">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
