const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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