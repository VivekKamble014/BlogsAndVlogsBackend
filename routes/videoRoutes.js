// backend/routes/videoRoutes.js

import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import {
  uploadVideo,
  getVideos,
  getVideoById,
  deleteVideo,
  createVideoComment,
} from '../controllers/videoController.js';
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  },
});

const upload = multer({ storage: storage });

router.route('/').post(protect, upload.single('videoFile'), uploadVideo);
router.route('/').post(protect, upload.single('videoFile'), uploadVideo).get(getVideos); // Add GET to this chain

router.route('/:id').get(getVideoById).delete(protect, deleteVideo); // Add GET and DELETE for a specific ID
router.route('/:id/comments').post(protect, createVideoComment);

export default router;