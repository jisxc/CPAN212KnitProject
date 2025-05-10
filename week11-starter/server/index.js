const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

const userRoutes = require('./routes/user_router');
const knitsRoutes = require('./routes/knit_router');
const orderRoutes = require('./routes/order_router');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/knits', knitsRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  console.log("Received request at /");
  res.send('Server is up and running!');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("MongoDB connection error:", error));
