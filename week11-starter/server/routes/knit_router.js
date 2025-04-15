const express = require('express');
const basicAuth = require('express-basic-auth');
const router = express.Router();

// Apply basic authentication only to this router
router.use(basicAuth({
  users: {
    [process.env.RAVELRY_USERNAME]: process.env.RAVELRY_PASSWORD // Use environment variables
  },
  challenge: true,
  unauthorizedResponse: 'Unauthorized'
}));

// Your API endpoints for knits
router.get('/', (req, res) => {
  // Logic to get knits
  res.json([{ title: 'Knit 1', author: 'Author 1', price: 10.99 }]);
});

module.exports = router;
