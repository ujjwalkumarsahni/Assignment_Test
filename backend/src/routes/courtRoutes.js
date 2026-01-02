import express from 'express';
import {
  getCourts,
  getCourtById,
  createSampleCourts
} from '../controllers/courtController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/seed', protect, createSampleCourts);
router.get('/', getCourts);
router.get('/:id', getCourtById);

export default router;