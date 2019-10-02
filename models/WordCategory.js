const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordCategorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = WordCategory = mongoose.model('WordCategory', WordCategorySchema);