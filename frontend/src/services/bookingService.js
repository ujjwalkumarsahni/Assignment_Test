import API from './api.js';

export const bookingService = {
  // Get all courts with filters
  getCourts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.sport) params.append('sport', filters.sport);
    if (filters.date) params.append('date', filters.date);
    
    const response = await API.get(`/courts?${params.toString()}`);
    return response.data;
  },

  // Get single court
  getCourtById: async (id) => {
    const response = await API.get(`/courts/${id}`);
    return response.data;
  },

  // Create booking
  createBooking: async (bookingData) => {
    const response = await API.post('/bookings', bookingData);
    return response.data;
  },

  // Get user bookings
  getUserBookings: async () => {
    const response = await API.get('/bookings/mybookings');
    return response.data;
  },

  // Create sample courts (for development)
  createSampleCourts: async () => {
    const response = await API.post('/courts/seed');
    return response.data;
  }
};