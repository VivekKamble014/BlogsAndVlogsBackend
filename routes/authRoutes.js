// backend/routes/authRoutes.js (Updated)

import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile, // Import new controller
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// Add the protected route
router.get('/profile', protect, getUserProfile);

export default router;