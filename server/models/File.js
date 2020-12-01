const mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    albumID: {
        type: String,
        required: false,
        unique: false
    },
    userID: {
        type: String,
        required: false,
        unique: false
    }
});

mongoose.model('File', fileSchema);