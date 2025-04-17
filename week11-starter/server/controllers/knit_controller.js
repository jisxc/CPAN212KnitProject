const Knit = require('../models/knit');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const axios = require('axios');

exports.getAllKnits = async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://api.ravelry.com/patterns/search.json', {
      auth: {
        username: process.env.RAVELRY_USERNAME,
        password: process.env.RAVELRY_PASSWORD
      },
      params: query
        ? {
          query: query,
          page_size: 9
        }
        : {
          sort: 'best',
          page: Math.floor(Math.random() * 100) + 1,
          page_size: 9
        }
    });

    const filteredKnits = response.data.patterns
      .filter((pattern) => pattern.name && pattern.first_photo)
      .map((pattern) => ({
        id: pattern.id,
        name: pattern.name,
        price: pattern.price?.usd || 0,
        first_photo: pattern.first_photo,
      }));

    console.log("Cleaned Knit Patterns: ", filteredKnits);



    console.log("Number of filtered Knits: ", filteredKnits.length);
    res.json(filteredKnits);
  } catch (err) {
    console.error("Error fetching from Ravelry api: ", err.message);
    res.status(500).json({ error: err.message });
  }
};