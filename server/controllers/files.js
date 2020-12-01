const uri = require('../models/secret_data.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const error_h = require('./error');
const resize = require('./resize');


module.exports.getFile = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                res.type(`image/jpg`)
                resize(uri.library + '/' + req.params[0], 'jpg', 320).pipe(res)
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};