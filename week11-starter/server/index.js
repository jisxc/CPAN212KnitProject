const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const basicAuth = require('express-basic-auth');

const app = express();
const knitsRoutes = require('./routes/knit_router');

app.use(cors());

app.use(express.json());
app.use('/api/knits', basicAuth ({
  users: {
    [process.env.RAVELRY_USERNAME]: process.env.RAVELRY_PASSWORD
  },
  challenge: true,
  unauthorizedResponse: 'Unauthorized'
}), knitsRoutes);

// Test route to check server health
app.get('/', (req, res) => {
  console.log("Received request at /");
  res.send('Server is up and running!');
});

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
