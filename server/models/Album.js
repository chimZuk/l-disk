const mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    previewURL: {
        type: String,
        required: false
    },
    previewSign: {
        type: String,
        required: false
    },
    folderName: {
        type: String,
        unique: true,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
});

mongoose.model('Album', albumSchema);