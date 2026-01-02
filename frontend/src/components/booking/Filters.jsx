import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    sport: '',
    date: '',
    time: ''
  });

  const sports = [
    { value: '', label: 'All Sports' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'football', label: 'Football' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'basketball', label: 'Basketball' }
  ];

  const timeSlots = [
    { value: '', label: 'Any Time' },
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 12 AM)' },
    { value: 'night', label: 'Night (12 AM - 6 AM)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Book your Perfect Sports Turf Today
      </h2>
      <p className="text-gray-600 mb-6">
        Find the nearest court, book your slot, and play without limits.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location - Simplified for demo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              LOCATION
            </label>
            <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500">
              London, UK
            </div>
            <p className="text-xs text-gray-500 mt-1">Location automatically detected</p>
          </div>

          {/* Sport */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SPORT
            </label>
            <select
              name="sport"
              value={filters.sport}
              onChange={handleChange}
              className="input-field"
            >
              {sports.map((sport) => (
                <option key={sport.value} value={sport.value}>
                  {sport.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaClock className="inline mr-2" />
              TIME
            </label>
            <select
              name="time"
              value={filters.time}
              onChange={handleChange}
              className="input-field"
            >
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaCalendarAlt className="inline mr-2" />
              DATE
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              min={today}
              className="input-field"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2"
        >
          <FaSearch />
          <span>Search Courts</span>
        </button>
      </form>
    </div>
  );
};

export default Filters;