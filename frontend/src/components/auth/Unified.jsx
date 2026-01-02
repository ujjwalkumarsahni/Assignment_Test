import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { authService } from '../../services/authService';

const Unified = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState('login'); // login | register
  const [loading, setLoading] = useState(false);

  const initialState = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialState);
      setMode('login');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await authService.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        await authService.register(formData);
      }

      onClose();
      onSuccess(); // refresh header
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === 'register' && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="auth-input"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-primary-600 font-medium hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Unified;
