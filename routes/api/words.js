const express = require('express');
const router = express.Router();

const Word = require('../../models/Word');

// @route GET api/words
// @desc Get All Words
// @access Public
router.get('/get_words', (req, res) => {
    const { userCategories=[], excludeWords=[] } = req.query;
    console.log(userCategories, excludeWords)
    // let query = {$and}
    // if (userCategories.length !== 0){
    //
    // }
    // let query = {$and}
    Word.find({$and: [{categories: {$in: userCategories}},{_id: { $nin: excludeWords}}]})
        .sort({ created_at: -1 })
        .then(words => {console.log('words',words);res.json(words)})

});

// @route GET api/words
// @desc Get All Words
// @access Public
router.get('/get_user_words', (req, res) => {
    const { wordsId } = req.params;
    Word.find({_id: {$in: wordsId}})
        .sort({ created_at: -1 })
        .then(words => {console.log('user words',words);res.json(words)})
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