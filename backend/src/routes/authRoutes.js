import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile
} from '../controllers/authController.js';
import { validateRegistration, handleValidationErrors } from '../utils/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegistration, handleValidationErrors, registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;