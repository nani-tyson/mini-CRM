import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getStats } from '../controllers/statsController.js';

const router = express.Router();

// This route will be protected to ensure we only get stats for the logged-in user
router.route('/').get(protect, getStats);

export default router;
