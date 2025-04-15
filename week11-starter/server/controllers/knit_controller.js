const Knit = require('../models/knit');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
//const axios = require('axios');

//exports.getAllKnits = async (req, res) => {
  //const { query } = req.query;

  //try {
   // const response = await axios.get('https://api.ravelry.com/patterns/search.json', {
     // auth: {
        //username: process.env.RAVELRY_USERNAME,
        //password: process.env.RAVELRY_PASSWORD
      //},
      //params: query
        //? {
         // query: query,
          //page_size: 9
        //}
        //: {
         // sort: 'best',
         // page: Math.floor(Math.random() * 100) + 1,
          //page_size: 9
        //}
    //});

    //console.log("fetched knit:" , response.data.patterns);

    //res.json(response.data.patterns);
  //} catch (err) {
    //console.error("Error fetching from Ravelry api: ", err.message);
    //res.status(500).json({ error: err.message });
  //}
//};

const axios = require("axios");

exports.getAllKnits = async (req, res) => {
  try {
    const { query } = req.query;

    const searchUrl = query
      ? `https://api.ravelry.com/patterns/search.json?query=${encodeURIComponent(query)}`
      : `https://api.ravelry.com/patterns/search.json?sort=best&craft=knitting`;

    const response = await axios.get(searchUrl, {
      auth: {
        username: process.env.RAVELRY_USERNAME,
        password: process.env.RAVELRY_PASSWORD,
      },
    });

    const patterns = response.data.patterns.filter((pattern) => {
      const firstPhoto = pattern?.photos?.[0];
      return pattern.name && firstPhoto;
    });

    res.json(patterns);
  } catch (err) {
    console.error("Failed to fetch knits:", err.message);
    res.status(500).json({ error: "Failed to fetch patterns" });
  }
};
