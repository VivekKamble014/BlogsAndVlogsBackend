// backend/models/Video.js

import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
        comments: [commentSchema] // Add this line

  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;