const express = require('express');
const router = express.Router();

const WordCategory = require('../../models/WordCategory');

// @route GET /api/word_categories
// @desc Get All Word Categories
// @access Public
router.get('/', (req, res) => {
    WordCategory.find()
        .sort({ created_at: -1 })
        .then(categories => res.json(categories))
});

module.exports = router;