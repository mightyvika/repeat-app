const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    transcription: {
        type: String
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WordCategory'
    }],
    translation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date()
    },
    updated_at: {
        type: Date,
        default: Date()
    }
});

module.exports = Word = mongoose.model('word', WordSchema);