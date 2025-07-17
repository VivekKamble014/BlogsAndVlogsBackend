// backend/controllers/blogController.js

import Blog from '../models/Blog.js';

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please add a title and content' });
  }

  const blog = await Blog.create({
    title,
    content,
    author: req.user._id, // From protect middleware
  });

  res.status(201).json(blog);
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('author', 'username');
  res.json(blogs);
};
export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'username');

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

export const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Check if the logged-in user is the author
  if (blog.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  // Check if the logged-in user is the author
  if (blog.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await blog.deleteOne();
  res.json({ message: 'Blog removed' });
};