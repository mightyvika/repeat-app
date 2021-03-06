const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordCategorySchema = new Schema({
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

module.exports = WordCategory = mongoose.model('wordCategory', WordCategorySchema);