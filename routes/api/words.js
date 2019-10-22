const express = require('express');
const router = express.Router();

const Word = require('../../models/Word');

// @route GET api/words
// @desc Get All Words
// @access Public
router.get('/get_words', (req, res) => {
   Word.find()
       .sort({ created_at: -1 })
       .then(words => res.json(words))
});

// @route GET api/words
// @desc Get All Words
// @access Public
router.get('/get_user_words', (req, res) => {

    Word.find()
        .sort({ created_at: -1 })
        .then(words => res.json(words))
});

// @route POST api/words
// @desc Create All Words
// @access Public
router.post('/', (req, res) => {
    Word.find()
        .sort({ created_at: -1 })
        .then(words => res.json(words))
});

module.exports = router;