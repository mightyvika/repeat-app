const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    categories: [{
        type: String
    }],
    knownWords: [{
        type: String
    }],
    wordsToLearn: [{
        type: String
    }],
    learnedWords: [{
        type: String
    }],
    created_at: {
        type: Date,
        default: Date()
    },
    updated_at: {
        type: Date,
        default: Date()
    }
});

module.exports = User = mongoose.model('user', UserSchema);