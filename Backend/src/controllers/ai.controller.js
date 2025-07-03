const generateContent = require('../services/ai.service');

exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    console.log('Received code for review:', code);

    if (!code || typeof code !== 'string') {
      console.error('Invalid code in request body:', code);
      return res.status(400).json({ error: 'No valid code provided in request body.' });
    }

    if (!process.env.GOOGLE_GEMINI_KEY) {
      console.error('Google Gemini API key missing');
      return res.status(500).json({ error: 'Google Gemini API key is missing. Please set GOOGLE_GEMINI_KEY environment variable.' });
    }

    const review = await generateContent(code);

    console.log('Generated review:', review);
    res.status(200).json({ review });

  } catch (error) {
    console.error('Google Gemini error:', error);
    const errorMessage = error.message || 'Failed to generate code review.';
    res.status(500).json({ error: errorMessage });
  }
};
