import Booking from '../models/Booking.js';
import Court from '../models/Court.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { courtId, date, timeSlotId } = req.body;
    const userId = req.user._id;

    // Find the court
    const court = await Court.findById(courtId);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    // Find the time slot
    const timeSlot = court.timeSlots.id(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    // Check if time slot is available
    if (!timeSlot.isAvailable) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    // Check for existing booking for same court, date, and time slot
    const existingBooking = await Booking.findOne({
      court: courtId,
      date: new Date(date),
      'timeSlot.startTime': timeSlot.startTime,
      status: 'confirmed'
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      court: courtId,
      courtName: court.name,
      sport: court.sport,
      date: new Date(date),
      timeSlot: {
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        price: timeSlot.price
      },
      totalAmount: timeSlot.price,
      status: 'confirmed',
      paymentStatus: 'pending'
    });

    // Mark time slot as unavailable
    timeSlot.isAvailable = false;
    await court.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('court', 'name sport location images')
      .sort('-createdAt');

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('court', 'name sport')
      .sort('-createdAt');

    res.json(bookings);
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};