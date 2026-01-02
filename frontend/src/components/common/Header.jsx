import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import Unified from '../auth/Unified.jsx';
import { authService } from '../../services/authService.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full"></div>
            <span className="text-2xl font-bold text-primary-700">Cridaa</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/book" className="nav-link">Book Turf</Link>
            {user && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span>Hi, {user.name}</span>
                <button onClick={handleLogout} className="text-red-600">
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="btn-primary">
                Get Started
              </button>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <Unified
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={loadUser}
      />
    </>
  );
};

export default Header;
