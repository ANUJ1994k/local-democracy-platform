const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧪 Dummy legislation list for testing
const dummyLegislation = [
  { id: 1, title: 'Clean Water Bill', description: 'Ensures clean drinking water for all regions.' },
  { id: 2, title: 'Traffic Regulation Act', description: 'Revised traffic fines and speed limits.' },
];

// ✅ Correct: GET route defined at top level
router.get('/all', (req, res) => {
  res.json(dummyLegislation);
});

router.post('/summarize', async (req, res) => {
  const { originalText } = req.body;

  if (!originalText) {
    return res.status(400).json({ error: 'Original text is required' });
  }

  // 🔧 MOCK MODE
  const mockMode = true;

  if (mockMode) {
    return res.json({
      summary: "📘 This is a mocked summary: This legislation proposes new guidelines to improve water management and transparency in Sector 10A. The aim is to ensure fair distribution, reduce waste, and involve local residents in decision-making.",
    });
  }

  // 🔁 REAL OpenAI API call (only reached if mockMode = false)
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an assistant that summarizes legislative or legal text into simple, plain language.",
        },
        {
          role: "user",
          content: `Please summarize this legislation: ${originalText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

module.exports = router;
