const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    transcription: {
        type: String
    },
    categories: [{
        type: String,
    }],
    translation: {
        type: String,
        required: true
    },
    word: {
        type: String,
        required: true
    }
});

module.exports = Word = mongoose.model('word', WordSchema);