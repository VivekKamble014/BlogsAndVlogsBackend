// backend/controllers/videoController.js

import Video from '../models/Video.js';
import fs from 'fs'; // Import File System for deleting files


// @desc    Upload a new video
// @route   POST /api/videos
// @access  Private
export const uploadVideo = async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a video file' });
  }

  const video = await Video.create({
    title,
    description,
    videoUrl: `/${req.file.path}`, // Path provided by Multer
    uploader: req.user._id,
  });

  res.status(201).json(video);
};

export const getVideos = async (req, res) => {
  const videos = await Video.find({}).populate('uploader', 'username');
  res.json(videos);
};
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id)
    .populate('uploader', 'username')
    .populate('comments.author', 'username'); // <-- Update this line

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  // Check if the logged-in user is the uploader
  if (video.uploader.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  // Delete the physical file from the 'uploads' folder
  const filePath = video.videoUrl.substring(1); // remove leading '/'
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Failed to delete video file:', err);
      // We can still proceed to delete the DB record, or handle error differently
    }
  });

  await video.deleteOne();
  res.json({ message: 'Video removed' });
};

export const createVideoComment = async (req, res) => {
  const { text } = req.body;
  const video = await Video.findById(req.params.id);

  if (video) {
    const comment = {
      text,
      author: req.user._id,
    };
    video.comments.push(comment);
    await video.save();
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(404).json({ message: 'Video not found' });
  }
};
