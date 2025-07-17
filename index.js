// backend/index.js (Updated)

import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import blogRoutes from './routes/blogRoutes.js'; // Import blog routes

import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes); // Add this line

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));