const express = require('express');
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  console.log("Registration data received:", req.body); // Log request body

  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with status 201 for successful creation
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error); // Log any error
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

module.exports = router;
