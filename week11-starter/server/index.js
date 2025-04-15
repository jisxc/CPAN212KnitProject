const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const basicAuth = require('express-basic-auth');
const app = express();

// Set up middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Basic Auth setup
app.use(basicAuth({
  users: { 
    [process.env.VITE_RAVELRY_USERNAME]: process.env.VITE_RAVELRY_PASSWORD // Use environment variables for security
  },
  challenge: true,
  unauthorizedResponse: 'Unauthorized'
}));

// Test route to check server health
app.get('/', (req, res) => {
  console.log("Received request at /");
  res.send('Server is up and running!');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
