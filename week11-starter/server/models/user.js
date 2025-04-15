const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Added timestamps for tracking when the user was created/updated

const User = mongoose.model('User', userSchema);

module.exports = User;
