import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { bookingService } from '../services/bookingService.js';
import { toast } from 'react-hot-toast';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit
} from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserBookings();
    }
  }, [isAuthenticated]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getUserBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
      toast.error('Failed to load bookings');
      console.error('Fetch bookings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status, paymentStatus) => {
    if (status === 'cancelled') {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          <FaTimesCircle className="inline mr-1" /> Cancelled
        </span>
      );
    }
    
    if (paymentStatus === 'pending') {
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          <FaHourglassHalf className="inline mr-1" /> Payment Pending
        </span>
      );
    }
    
    if (status === 'confirmed') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <FaCheckCircle className="inline mr-1" /> Confirmed
        </span>
      );
    }
    
    if (status === 'completed') {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          <FaCheckCircle className="inline mr-1" /> Completed
        </span>
      );
    }
    
    return null;
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      // In production, implement actual cancellation logic
      toast.success('Booking cancellation request sent (demo)');
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              Authentication Required
            </h2>
            <p className="text-yellow-700 mb-6">
              Please login to access your dashboard.
            </p>
            <a
              href="/"
              className="btn-primary"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            {/* User Profile Summary */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-primary-600 text-3xl" />
              </div>
              <h3 className="font-bold text-lg">{user?.name}</h3>
              <p className="text-gray-600 text-sm">{user?.email}</p>
              <div className="mt-4 flex justify-center">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  <FaEdit className="inline mr-1" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaCalendarAlt className="inline mr-3" />
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaUser className="inline mr-3" />
                Profile Details
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaTimesCircle className="inline mr-3" />
                Logout
              </button>
            </nav>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Booking Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-bold">{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-blue-600">
                    {bookings.filter(b => b.status === 'completed').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* My Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
                <button
                  onClick={fetchUserBookings}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Refresh
                </button>
              </div>

              {loading && <LoadingSpinner />}
              
              {error && (
                <ErrorMessage 
                  message={error} 
                  onRetry={fetchUserBookings} 
                />
              )}

              {!loading && !error && bookings.length === 0 && (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCalendarAlt className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    No Bookings Yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You haven't made any bookings yet. Start by exploring available courts and booking your first slot!
                  </p>
                  <a
                    href="/book"
                    className="btn-primary"
                  >
                    Browse Courts
                  </a>
                </div>
              )}

              {!loading && !error && bookings.length > 0 && (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {booking.courtName}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <FaMapMarkerAlt className="mr-2" />
                              <span className="capitalize">{booking.sport} Court</span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0">
                            {getStatusBadge(booking.status, booking.paymentStatus)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Date</p>
                              <p className="font-medium">{formatDate(booking.date)}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Time Slot</p>
                              <p className="font-medium">
                                {formatTime(booking.timeSlot.startTime)} - {formatTime(booking.timeSlot.endTime)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaMoneyBillWave className="text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Amount</p>
                              <p className="font-medium">£{booking.totalAmount}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4 border-t border-gray-200">
                          {booking.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Cancel Booking
                              </button>
                              <button
                                onClick={() => toast.success('Payment initiated (demo)')}
                                className="btn-primary"
                              >
                                Make Payment
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => toast.success('Details loaded (demo)')}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="input-field bg-gray-50"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="input-field bg-gray-50"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user?.phone}
                      className="input-field bg-gray-50"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      className="input-field bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Account Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => toast.success('Edit mode activated (demo)')}
                      className="btn-primary"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => toast.success('Password reset link sent (demo)')}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                          toast.success('Account deletion requested (demo)');
                        }
                      }}
                      className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {bookings.length}
                  </div>
                  <h4 className="font-bold text-blue-800 mb-1">Total Bookings</h4>
                  <p className="text-blue-700 text-sm">All time bookings made</p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <h4 className="font-bold text-green-800 mb-1">Active Bookings</h4>
                  <p className="text-green-700 text-sm">Currently confirmed</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {bookings.filter(b => b.status === 'completed').length}
                  </div>
                  <h4 className="font-bold text-purple-800 mb-1">Completed</h4>
                  <p className="text-purple-700 text-sm">Past bookings</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;