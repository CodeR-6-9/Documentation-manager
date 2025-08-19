// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  
  // Add the new role field
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  // Fields for the submission form
  fullName: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  //... other form fields
  zipCode: { type: String, default: '' },
  documentUrl: { type: String, default: '' },
  verificationStatus: {
    type: String,
    enum: ['not_submitted', 'pending', 'approved', 'rejected'],
    default: 'not_submitted',
  },
});

module.exports = mongoose.model('User', UserSchema);