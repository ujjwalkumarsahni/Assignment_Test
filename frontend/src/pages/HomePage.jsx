import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaCheckCircle,
  FaSearch,
  FaClock,
  FaUsers,
  FaStar,
  FaHeart,
  FaFilter,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const HomePage = () => {
  // State for interactive elements
  const [activeSport, setActiveSport] = useState('Badminton');
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showBookingWidget, setShowBookingWidget] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Popular venues data
  const popularVenues = [
    { id: 1, name: "City Sports Arena", rating: 4.8, sports: ["Badminton", "Tennis"], price: "$25/hr", location: "Downtown", image: "arena" },
    { id: 2, name: "Green Turf Stadium", rating: 4.6, sports: ["Football", "Cricket"], price: "$40/hr", location: "Northside", image: "stadium" },
    { id: 3, name: "Pro Court Center", rating: 4.9, sports: ["Basketball", "Volleyball"], price: "$30/hr", location: "East End", image: "court" },
    { id: 4, name: "Elite Sports Complex", rating: 4.7, sports: ["Badminton", "Tennis", "Squash"], price: "$35/hr", location: "Westside", image: "complex" },
  ];

  // Sports with icons and colors
  const sportsData = [
    { name: 'Badminton', color: 'from-blue-500 to-cyan-400', icon: '🏸' },
    { name: 'Cricket', color: 'from-green-500 to-emerald-400', icon: '🏏' },
    { name: 'Football', color: 'from-purple-500 to-violet-400', icon: '⚽' },
    { name: 'Tennis', color: 'from-orange-500 to-yellow-400', icon: '🎾' },
    { name: 'Basketball', color: 'from-red-500 to-pink-400', icon: '🏀' },
  ];

  // Initialize today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    
    // Set default time to next hour
    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1);
    const timeString = `${nextHour.getHours().toString().padStart(2, '0')}:00`;
    setTime(timeString);
  }, []);

  // Handle favorite toggle
  const toggleFavorite = (venueId) => {
    setFavorites(prev => ({
      ...prev,
      [venueId]: !prev[venueId]
    }));
  };

  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Booking submitted for ${activeSport} on ${date} at ${time}`);
    setShowBookingWidget(false);
  };

  // Handle next/prev slide for popular venues
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % popularVenues.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + popularVenues.length) % popularVenues.length);
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800  py-16 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Book Your Perfect <span className="text-black">Sports Turf</span> Today
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Find the nearest court, book your slot, and play without limits. Real-time availability and instant confirmation.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Quick Book Now
              <FaArrowRight className="ml-3 animate-pulse" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Interactive */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Three simple steps to book your perfect game</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaMapMarkerAlt className="text-primary-600 text-3xl" />, 
                title: "Find Nearby Courts", 
                desc: "Discover sports courts and turfs near you with real-time availability.",
                color: "bg-blue-50",
                step: "01"
              },
              { icon: <FaCalendarAlt className="text-primary-600 text-3xl" />, 
                title: "Book Your Slot", 
                desc: "Choose your preferred date and time slot. Instant confirmation.",
                color: "bg-purple-50",
                step: "02"
              },
              { icon: <FaCheckCircle className="text-primary-600 text-3xl" />, 
                title: "Play & Enjoy", 
                desc: "Show up and play! Everything is taken care of for you.",
                color: "bg-green-50",
                step: "03"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className={`${step.color} rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-full  flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -left-2 w-10 h-10 bg-primary-600  rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.desc}</p>
                <div className="h-1 w-20 bg-primary-600 rounded-full mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats & CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Join Thousands of Sports Enthusiasts</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Book your perfect game with us and experience seamless sports booking
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { value: '500+', label: 'Sports Venues' },
              { value: '50K+', label: 'Happy Players' },
              { value: '10+', label: 'Sports Types' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/book"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-12 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Booking Now
              <FaArrowRight className="ml-3 animate-pulse" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;