const express = require('express');
const router = express.Router();
const VotePoll = require('../models/VotePoll');

// Create a new poll
router.post('/create', async (req, res) => {
  try {
    const poll = await VotePoll.create(req.body);
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create poll' });
  }
});

// Get active polls
router.get('/active', async (req, res) => {
  const now = new Date();
  const polls = await VotePoll.find({
    $or: [{ endsAt: { $gt: now } }, { endsAt: null }]
  });
  res.json(polls);
});

// Submit vote
router.post('/vote/:pollId', async (req, res) => {
  const { pollId } = req.params;
  const { userId, option } = req.body;

  try {
    const poll = await VotePoll.findById(pollId);
    if (!poll.options.includes(option)) {
      return res.status(400).json({ error: 'Invalid option selected' });
    }

    const alreadyVoted = Array.from(poll.votes.values()).flat().includes(userId);
    if (alreadyVoted) {
      return res.status(403).json({ error: 'User already voted' });
    }

    if (!poll.votes.has(option)) poll.votes.set(option, []);
    poll.votes.get(option).push(userId);

    await poll.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record vote' });
  }
});

module.exports = router;
