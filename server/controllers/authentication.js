const passport = require('passport');
const mongoose = require('mongoose');
const fs = require('fs');
const uri = require('../models/secret_data.js');

const library = uri.library;
const User = mongoose.model('User');
const error_h = require('./error');

module.exports.register = function (req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.folderName = "user-" + user._id;
    user.pictureURL = "https://p1.hiclipart.com/preview/92/266/333/donut-with-pink-cream-and-assorted-colored-sprinkle-illustration-png-clipart.jpg";
    user.setPassword(req.body.password);
    user.save(function (err) {
        var mkdir = new Promise((resolve, reject) => {
            createDirectory(library + "/" + user.folderName, resolve, reject);
        });

        mkdir.then(value => {
            var token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }, reason => {
            console.error(reason);
        });
    });

};

module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

// Helper functions

function createDirectory(path, resolve, reject) {
    var mask = 0777;
    fs.mkdir(path, mask, function (err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
}