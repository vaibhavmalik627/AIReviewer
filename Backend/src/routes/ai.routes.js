const express = require('express');
const aiController = require('../controllers/ai.controller');
const router = express.Router();

/**
 * @route   POST /ai/get-review
 * @desc    Receives a code snippet and returns a review
 * @access  Public
 */
router.post('/get-review', aiController.getReview);

/**
 * @route   GET /ai/get-review
 * @desc    Inform user that GET method is not allowed
 * @access  Public
 */
router.get('/get-review', (req, res) => {
  res.status(405).json({ error: 'Method GET not allowed. Please use POST.' });
});

/**
 * @route   GET /ai/
 * @desc    Welcome message with usage instructions
 * @access  Public
 */
router.get('/', (req, res) => {
res.send('🧠 Welcome to the AI Code Review API.\n\n👉 Use POST /ai/get-review with a JSON body like: { "code": "your code here" }');
});

module.exports = router;
