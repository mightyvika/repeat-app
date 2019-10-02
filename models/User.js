const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WordCategory'
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

module.exports = User = mongoose.model('User', UserSchema);