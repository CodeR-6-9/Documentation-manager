const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    phone:    { type: String, required: true },
    street:   { type: String },
    city:     { type: String },
    zip:      { type: String },
    pdfPath:  { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
