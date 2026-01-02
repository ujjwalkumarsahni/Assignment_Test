import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import Filters from '../components/booking/Filters';
import CourtCard from '../components/booking/CourtCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { toast } from 'react-hot-toast';

const BookingPage = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async (appliedFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getCourts(appliedFilters);
      setCourts(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch courts. Please try again.');
      toast.error('Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    await fetchCourts(newFilters);
  };

  const createSampleData = async () => {
    try {
      setLoading(true);
      await bookingService.createSampleCourts();
      await fetchCourts();
      toast.success('Sample courts created successfully!');
    } catch {
      toast.error('Failed to create sample courts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Book Your Sports Turf
        </h1>
        <p className="text-gray-600 text-lg">
          Discover & book premium courts near you
        </p>
      </div>

      {/* FILTERS */}
      <div className="mb-10">
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* LOADING */}
      {loading && <LoadingSpinner />}

      {/* ERROR */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => fetchCourts(filters)}
        />
      )}

      {/* EMPTY STATE */}
      {!loading && !error && courts.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-primary-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🏸</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">No Courts Found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Try adjusting filters or generate demo courts for testing.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleFilterChange({})}
              className="btn-secondary"
            >
              Clear Filters
            </button>
            <button
              onClick={createSampleData}
              className="btn-primary"
            >
              Create Sample Courts
            </button>
          </div>
        </div>
      )}

      {/* COURTS LIST */}
      {!loading && !error && courts.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Available Courts
            </h2>
            <span className="text-gray-500">
              {courts.length} result{courts.length > 1 && 's'}
            </span>
          </div>

          <div className="grid gap-8">
            {courts.map((court) => (
              <CourtCard key={court._id} court={court} />
            ))}
          </div>
        </>
      )}

      {/* AUTH WARNING */}
      {!isAuthenticated && (
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex gap-4">
          <span className="text-3xl">🔒</span>
          <div>
            <h3 className="font-bold text-yellow-800">
              Login required to book
            </h3>
            <p className="text-yellow-700">
              You can browse courts, but booking requires login or signup.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
