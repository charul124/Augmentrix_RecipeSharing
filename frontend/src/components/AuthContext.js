import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const navigate = useNavigate();

  const handleLogin = async (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = async () => {
    try {
        console.log('Toast notification triggered');
        toast.info('Logging out...');
      await axios.post('https://augmentrix-recipesharing.onrender.com/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };