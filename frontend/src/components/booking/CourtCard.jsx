import React, { useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaUsers, FaChevronRight } from 'react-icons/fa';
import TimeSlot from './TimeSlot.jsx';
import BookingModal from './BookingModal.jsx';

const CourtCard = ({ court }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  // Group time slots by time of day
  const morningSlots = court.timeSlots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour >= 6 && hour < 12;
  });

  const afternoonSlots = court.timeSlots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour >= 12 && hour < 18;
  });

  const eveningSlots = court.timeSlots.filter(slot => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    return hour >= 18 && hour < 24;
  });

  return (
    <>
      <div className="card hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Court Image */}
          <div className="md:w-1/3">
            <div className="bg-gray-200 rounded-lg h-48 md:h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {court.sport.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-700 capitalize">
                  {court.sport}
                </span>
              </div>
            </div>
          </div>

          {/* Court Details */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {court.name}
                </h3>
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{court.distance} km away</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span>{court.rating} ({court.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {showDetails ? 'Hide Details' : 'View more'}
                <FaChevronRight className={`inline ml-1 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Facilities */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Facilities:</h4>
              <div className="flex flex-wrap gap-2">
                {court.facilities?.map((facility, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Available Slots:</h4>
                
                {/* Morning Slots */}
                {morningSlots.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-600 mb-2">Morning (6 AM - 12 PM)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {morningSlots.map((slot, index) => (
                        <TimeSlot
                          key={index}
                          slot={slot}
                          onBook={() => handleBookSlot(slot)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Afternoon Slots */}
                {afternoonSlots.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-600 mb-2">Afternoon (12 PM - 6 PM)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {afternoonSlots.map((slot, index) => (
                        <TimeSlot
                          key={index}
                          slot={slot}
                          onBook={() => handleBookSlot(slot)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Evening Slots */}
                {eveningSlots.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-2">Evening (6 PM - 12 AM)</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {eveningSlots.map((slot, index) => (
                        <TimeSlot
                          key={index}
                          slot={slot}
                          onBook={() => handleBookSlot(slot)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-gray-900">£{Math.min(...court.timeSlots.map(s => s.price))}/hr</span>
                  <span className="text-gray-600 ml-2">starting from</span>
                </div>
                <button
                  onClick={() => handleBookSlot(court.timeSlots[0])}
                  className="btn-primary"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info - Show when expanded */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Court Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Location:</h5>
                <p className="text-gray-600">
                  {court.location?.address || 'Location details available upon booking'}
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Contact:</h5>
                <p className="text-gray-600">Contact information available after booking</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedSlot && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          court={court}
          timeSlot={selectedSlot}
        />
      )}
    </>
  );
};

export default CourtCard;