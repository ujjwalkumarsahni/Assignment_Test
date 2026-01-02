import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { bookingService } from '../../services/bookingService.js';
import { toast } from 'react-hot-toast';
import { FaTimes, FaCalendarAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const BookingModal = ({ isOpen, onClose, court, timeSlot }) => {
  const { user, isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a slot');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    setIsBooking(true);
    try {
      const bookingData = {
        courtId: court._id,
        date: selectedDate,
        timeSlotId: timeSlot._id
      };

      await bookingService.createBooking(bookingData);
      toast.success('Booking successful!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsBooking(false);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Confirm Booking</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <p className="text-gray-600 mt-2">Complete your booking for {court.name}</p>
        </div>

        {/* Booking Details */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Court Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">{court.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium w-24">Sport:</span>
                  <span className="capitalize">{court.sport}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">Distance:</span>
                  <span>{court.distance} km away</span>
                </div>
              </div>
            </div>

            {/* Time Slot Info */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <FaClock className="mr-2" />
                Selected Time Slot
              </h4>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">
                    {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                  </div>
                  <div className="text-sm text-gray-600">Duration: 2 hours</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    £{timeSlot.price}
                  </div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="input-field"
                required
              />
            </div>

            {/* User Info - If logged in */}
            {isAuthenticated && user && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Booking As</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex">
                    <span className="font-medium w-20">Name:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-20">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium w-20">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Slot Price (2 hours)</span>
                <span className="font-medium">£{timeSlot.price * 2}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Service Fee</span>
                <span className="font-medium">£10</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-primary-600">£{(timeSlot.price * 2) + 10}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4">
              {isAuthenticated ? (
                <button
                  onClick={handleBooking}
                  disabled={isBooking || !selectedDate}
                  className="btn-primary w-full py-3 text-lg"
                >
                  {isBooking ? 'Processing...' : 'Confirm Booking'}
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-red-600 mb-4">Please login to book this slot</p>
                  <button
                    onClick={onClose}
                    className="btn-primary w-full py-3"
                  >
                    Go to Login
                  </button>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="w-full mt-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;