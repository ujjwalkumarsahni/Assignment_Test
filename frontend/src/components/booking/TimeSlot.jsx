import React from 'react';
import { FaClock } from 'react-icons/fa';

const TimeSlot = ({ slot, onBook }) => {
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <button
      onClick={onBook}
      disabled={!slot.isAvailable}
      className={`
        p-3 rounded-lg border text-left transition-all
        ${slot.isAvailable 
          ? 'border-primary-300 hover:border-primary-500 hover:bg-primary-50 cursor-pointer' 
          : 'border-gray-300 bg-gray-100 cursor-not-allowed'
        }
      `}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center text-sm">
          <FaClock className="mr-2 text-gray-500" />
          <span className="font-medium">
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">£{slot.price}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${slot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {slot.isAvailable ? 'Available' : 'Booked'}
        </span>
      </div>
    </button>
  );
};

export default TimeSlot;