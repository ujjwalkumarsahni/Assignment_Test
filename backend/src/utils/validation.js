import { body, validationResult } from 'express-validator';

// Validation rules for user registration
export const validateRegistration = [
  body('name').not().isEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').not().isEmpty().withMessage('Phone number is required')
];

// Validation rules for booking
export const validateBooking = [
  body('courtId').not().isEmpty().withMessage('Court ID is required'),
  body('date').not().isEmpty().withMessage('Date is required'),
  body('timeSlotId').not().isEmpty().withMessage('Time slot ID is required')
];

// Check validation results
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};