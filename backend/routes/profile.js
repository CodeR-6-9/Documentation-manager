// routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the route: POST /api/profile/submit
router.post('/submit', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No document file uploaded.' });
    }

    // This function handles uploading the file buffer to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'user-documents' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Error uploading file.' });
        }

        const { fullName, phoneNumber, streetAddress, city, zipCode } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }

        // Update all user fields
        user.fullName = fullName;
        user.phoneNumber = phoneNumber;
        user.streetAddress = streetAddress;
        user.city = city;
        user.zipCode = zipCode;
        user.documentUrl = result.secure_url; // URL from Cloudinary
        user.verificationStatus = 'pending';
        
        await user.save();
        res.status(200).json({ message: 'Profile submitted successfully. Awaiting verification.', user });
      }
    );

    // This line starts the upload process
    uploadStream.end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// A protected route for a user to get their own status
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({
      fullName: user.fullName,
      verificationStatus: user.verificationStatus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;