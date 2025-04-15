const mongoose = require('mongoose');

const knitSchema = new mongoose.Schema({
  patternName: { type: String, required: true, trim: true },
  designer: { type: String, required: true, trim: true },
  yarns: { type: [String], required: true },
  techniques: { type: [String], required: true },
  price: { type: Number, required: true, min: 0 },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Knit', knitSchema);
