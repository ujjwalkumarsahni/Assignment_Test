import Court from '../models/Court.js';

// @desc    Get all courts
// @route   GET /api/courts
// @access  Public
export const getCourts = async (req, res) => {
  try {
    const { sport, date } = req.query;
    let filter = {};

    // Apply filters if provided
    if (sport && sport !== 'all') {
      filter.sport = sport;
    }

    // If date is provided, filter time slots for that date
    // For simplicity, we're returning all courts with their time slots
    // In production, you'd filter time slots based on date and existing bookings

    const courts = await Court.find(filter);
    
    // Format response
    const formattedCourts = courts.map(court => ({
      _id: court._id,
      name: court.name,
      sport: court.sport,
      location: court.location,
      distance: court.distance,
      rating: court.rating,
      images: court.images,
      facilities: court.facilities,
      timeSlots: court.timeSlots.filter(slot => slot.isAvailable)
    }));

    res.json(formattedCourts);
  } catch (error) {
    console.error('Get courts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single court
// @route   GET /api/courts/:id
// @access  Public
export const getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    res.json(court);
  } catch (error) {
    console.error('Get court error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create sample courts (for development)
// @route   POST /api/courts/seed
// @access  Private/Admin
export const createSampleCourts = async (req, res) => {
  try {
    const sampleCourts = [
      {
        name: "Battledore Badminton & Sports",
        sport: "badminton",
        location: {
          address: "123 Sports Street",
          city: "London"
        },
        distance: 4.8,
        images: ["court1.jpg"],
        facilities: ["Showers", "Changing Rooms", "Parking"],
        timeSlots: [
          { startTime: "06:00", endTime: "08:00", price: 600, isAvailable: true },
          { startTime: "08:00", endTime: "10:00", price: 600, isAvailable: true },
          { startTime: "10:00", endTime: "12:00", price: 700, isAvailable: true },
          { startTime: "12:00", endTime: "14:00", price: 700, isAvailable: true },
          { startTime: "14:00", endTime: "16:00", price: 600, isAvailable: true },
          { startTime: "16:00", endTime: "18:00", price: 600, isAvailable: true },
          { startTime: "18:00", endTime: "20:00", price: 800, isAvailable: true },
          { startTime: "20:00", endTime: "22:00", price: 800, isAvailable: true }
        ],
        rating: 4.8,
        totalReviews: 125
      },
      {
        name: "Cridaa Badminton Center",
        sport: "badminton",
        location: {
          address: "456 Turf Avenue",
          city: "London"
        },
        distance: 11.9,
        images: ["court2.jpg"],
        facilities: ["Cafe", "Equipment Rental", "Coaching"],
        timeSlots: [
          { startTime: "06:00", endTime: "08:00", price: 550, isAvailable: true },
          { startTime: "08:00", endTime: "10:00", price: 550, isAvailable: true },
          { startTime: "10:00", endTime: "12:00", price: 650, isAvailable: true },
          { startTime: "12:00", endTime: "14:00", price: 650, isAvailable: true },
          { startTime: "14:00", endTime: "16:00", price: 550, isAvailable: true },
          { startTime: "16:00", endTime: "18:00", price: 550, isAvailable: true },
          { startTime: "18:00", endTime: "20:00", price: 750, isAvailable: true },
          { startTime: "20:00", endTime: "22:00", price: 750, isAvailable: true }
        ],
        rating: 4.5,
        totalReviews: 89
      },
      {
        name: "Premier Cricket Ground",
        sport: "cricket",
        location: {
          address: "789 Pitch Road",
          city: "London"
        },
        distance: 8.2,
        images: ["court3.jpg"],
        facilities: ["Pavilion", "Sight Screen", "Scoreboard"],
        timeSlots: [
          { startTime: "08:00", endTime: "12:00", price: 1200, isAvailable: true },
          { startTime: "12:00", endTime: "16:00", price: 1200, isAvailable: true },
          { startTime: "16:00", endTime: "20:00", price: 1500, isAvailable: true }
        ],
        rating: 4.7,
        totalReviews: 203
      }
    ];

    await Court.deleteMany({});
    const createdCourts = await Court.insertMany(sampleCourts);

    res.status(201).json({
      message: 'Sample courts created',
      courts: createdCourts
    });
  } catch (error) {
    console.error('Create sample courts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};