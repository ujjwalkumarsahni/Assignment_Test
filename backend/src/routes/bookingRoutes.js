import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings
} from '../controllers/bookingController.js';
import { validateBooking, handleValidationErrors } from '../utils/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.post('/', validateBooking, handleValidationErrors, createBooking);
router.get('/mybookings', getUserBookings);
router.get('/', protect, getAllBookings); // Admin only in production

export default router;