// backend/routes/blogRoutes.js (Updated)

import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  createBlogComment,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for /api/blogs
router.route('/').post(protect, createBlog).get(getBlogs);

// Routes for /api/blogs/:id
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);
router.route('/:id/comments').post(protect, createBlogComment);

export default router;