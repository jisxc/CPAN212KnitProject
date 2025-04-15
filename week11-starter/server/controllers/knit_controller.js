const Knit = require('../models/knit');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// GET all knits
exports.getAllKnits = async (req, res) => {
  try {
    const knits = await Knit.find().populate('created_by', 'first_name email');
    res.json(knits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create a knit
exports.createKnit = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { patternName, designer, yarns, techniques, price, difficulty } = req.body;

    if (!patternName || !designer || !yarns || !techniques || !price || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const knit = await Knit.create({
      patternName,
      designer,
      yarns: yarns.split(',').map(y => y.trim()),
      techniques: techniques.split(',').map(t => t.trim()),
      price,
      difficulty,
      created_by: user._id
    });

    res.status(201).json(knit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
