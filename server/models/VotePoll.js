const mongoose = require('mongoose');

const votePollSchema = new mongoose.Schema({
  question: String,
  description: String,
  options: [String], // e.g., ['Yes', 'No']
  votes: {
    type: Map,
    of: [String], // userIds or anonymous tokens who voted
    default: {}
  },
  location: String,
  createdAt: { type: Date, default: Date.now },
  endsAt: Date
});

module.exports = mongoose.model('VotePoll', votePollSchema);
