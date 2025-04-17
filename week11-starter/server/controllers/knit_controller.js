const Knit = require('../models/knit');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const axios = require('axios');
const knit = require('../models/knit');

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
        first_photo: pattern.first_photo,
      }));

    console.log("Filtered Knit Patterns: ", filteredKnits);

    res.json(filteredKnits);
  } catch (err) {
    console.error("Error fetching from Ravelry api: ", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getKnitById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.ravelry.com/patterns/${id}.json`, {
      auth: {
        username: process.env.RAVELRY_USERNAME,
        password: process.env.RAVELRY_PASSWORD
      }
    });

    const pattern = response.data.pattern;
    pattern.photos = response.data.pattern.photos || [];
    pattern.first_photo = pattern.photos[0] || null;
    console.log("Full pattern response from Ravelry: ", pattern);

    const readyPattern = {
      id: pattern.id,
      name: pattern.name,
      first_photo: pattern.first_photo,
      yarn_weight: pattern.yarn_weight,
      notes: pattern.notes,
    };

    console.log("Fetched pattern id: ", readyPattern);
    res.json(readyPattern);
  } catch (err) {
    console.error("Error fetching this pattern.", err.message);
    res.status(404).json({ error: "Pattern Not Found."});
  }
};