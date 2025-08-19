// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // We need this to check for login

// A simple Admin check middleware for this file
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/admin/submissions
// Get all users with a pending status
router.get('/submissions', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const pendingUsers = await User.find({ verificationStatus: 'pending' }).select('-password');
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/admin/verify/:userId
// Update a user's verification status
router.post('/verify/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body; // Expecting { "status": "approved" } or { "status": "rejected" }

    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const userToUpdate = await User.findByIdAndUpdate(
      req.params.userId,
      { verificationStatus: status },
      { new: true } // This option returns the updated document
    ).select('-password');

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: `User status updated to ${status}.`, user: userToUpdate });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;