const mongoose = require('mongoose');

const legislationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  originalText: { type: String, required: true },
  summary: { type: String, required: true }, // plain language version
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Legislation', legislationSchema);
