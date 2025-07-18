// backend/index.js (Updated)

import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import blogRoutes from './routes/blogRoutes.js'; 
import videoRoutes from './routes/videoRoutes.js'; // Import video routes
// Import blog routes
import path from 'path'; // Import path module
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

const __dirname = path.resolve(); // Set __dirname


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes); // Add this line
app.use('/api/videos', videoRoutes); // Add this line


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('Blogs & Vlogs Backend is Running ✅');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));