const uri = require('../models/secret_data.js');
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const rimraf = require("rimraf");
const User = mongoose.model('User');
const Album = mongoose.model('Album');
const File = mongoose.model('File');
const error_h = require('./error');


module.exports.profileRead = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};

module.exports.getAlbums = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                Album.find({ userID: req.payload._id }).exec(function (err, items) {
                    if (err) {
                        error_h(err, req, res);
                    }

                    res.status(200).json({ albums: items });
                });
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};

module.exports.createAlbum = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {

                var album = new Album();

                album.name = req.body.name;
                album.description = req.body.description;
                album.folderName = "album-" + album._id
                album.userID = user._id

                var album_parts = album.name.split(" ");

                if (album_parts.length == 1) {
                    album.previewSign = album_parts[0][0].toUpperCase();
                } else {
                    album.previewSign = String(album_parts[0][0].toUpperCase()) + String(album_parts[1][0].toUpperCase());
                }

                album.save(function (err) {
                    if (err) {
                        error_h(err, req, res);
                    }

                    var mkdir = new Promise((resolve, reject) => {
                        createDirectory(user.folderName + "/" + album.folderName, resolve, reject);
                    });

                    mkdir.then(() => {
                        res.status(200);
                        res.json({
                            album: album
                        });
                    }, err => {
                        if (err) {
                            error_h(err, req, res);
                        }
                    });
                });
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};

module.exports.deleteAlbum = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                Album.findByIdAndDelete(req.body._id).exec(function (err, album) {
                    if (err) {
                        error_h(err, req, res);
                    }

                    File.deleteMany({ albumID: req.body._id }).exec(function (err) {
                        if (err) {
                            error_h(err, req, res);
                        }

                        var rmdir = new Promise((resolve, reject) => {
                            deleteDirectory(user.folderName + "/" + album.folderName, resolve, reject);
                        });

                        rmdir.then(() => {
                            res.status(200);
                            res.json({
                                album: album
                            });
                        }, err => {
                            if (err) {
                                error_h(err, req, res);
                            }
                        });
                    });
                });
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};

module.exports.getPhotos = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                File.find({ userID: req.payload._id, albumID: req.body.albumID }).exec(function (err, items) {
                    if (err) {
                        error_h(err, req, res);
                    }

                    res.status(200).json({ files: items });
                });
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};

module.exports.deletePhoto = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                File.findByIdAndDelete(req.body._id).exec(function (err, file) {
                    if (err) {
                        error_h(err, req, res);
                    }

                    var rmdfile = new Promise((resolve, reject) => {
                        deleteFile(file.url, resolve, reject);
                    });

                    rmdfile.then(() => {
                        res.status(200);
                        res.json({
                            file: file
                        });
                    }, err => {
                        if (err) {
                            error_h(err, req, res);
                        }
                    });
                });
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};

// Helper functions
const library = uri.library;

function createDirectory(path, resolve, reject) {
    var mask = 0777;
    fs.mkdir(library + "/" + path, mask, function (err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
}

function deleteDirectory(path, resolve, reject) {
    rimraf(library + "/" + path, function (err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
}

function deleteFile(path, resolve, reject) {
    fs.unlink(library + path, function (err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
}

const sizeOf = require('image-size');


function saveFile(fileObject, user, album, file, resolve, reject) {
    sizeOf(file.path, function (err, size) {
        if (err) {
            reject(err);
        }

        fileObject.name = file.name;
        fileObject.description = "";
        fileObject.url = "/" + user.folderName + "/" + album.folderName + "/" + file.name;
        fileObject.albumID = album._id;
        fileObject.userID = user._id;
        fileObject.width = size.width;
        fileObject.height = size.height;
        fs.rename(file.path, library + "/" + user.folderName + "/" + album.folderName + "/" + file.name, function (err) {
            if (err) {
                reject(err);
            }
            fileObject.save(function (err) {
                if (err) {
                    reject(err);
                }
                resolve("Saved: " + fileObject.name);
            });
        });

    });
}



module.exports.uploadPhotos = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({ message: "Auth Error: User is not authorized." });
    } else {
        User.findById(req.payload._id).exec(function (err, user) {
            if (err) {
                error_h(err, req, res);
            }

            if (user != null) {
                var form = new formidable.IncomingForm();

                form.uploadDir = library + '/new/';
                form.keepExtensions = true
                form.multiples = true;
                form.maxFileSize = 100 * 1024 * 1024 * 1024;

                form.parse(req, function (err, fields, files) {
                    if (err) {
                        error_h(err, req, res);
                    }

                    var albumID = fields.albumID;
                    var searchObject = { userID: req.payload._id, _id: albumID };

                    Album.findOne(searchObject).exec(function (err, album) {
                        if (err) {
                            error_h(err, req, res);
                        }

                        if (album != null) {
                            var filesPromises = [];

                            if (files.files) {
                                if (Array.isArray(files.files)) {
                                    for (var i in files.files) {
                                        var file = files.files[i];
                                        var fileObject = new File();

                                        filesPromises.push(new Promise(function (resolve, reject) {
                                            saveFile(fileObject, user, album, file, resolve, reject);
                                        }));
                                    }
                                } else {
                                    var file = files.files;
                                    var fileObject = new File();

                                    filesPromises.push(new Promise(function (resolve, reject) {
                                        saveFile(fileObject, user, album, file, resolve, reject);
                                    }));
                                }

                                Promise.all(filesPromises).then(function (values) {
                                    res.status(200).json({ albumID: fields.albumID, files: files, result: values });
                                }, err => {
                                    if (err) {
                                        error_h(err, req, res);
                                    }
                                });
                            } else {
                                res.status(400).json({ message: "Upload Error: No Files submitted." })
                            }
                        } else {
                            res.status(406).json({ message: "Upload Error: Album is not found." })
                        }
                    });
                });
            } else {
                res.status(401).json({ message: "Auth Error: User is not found." })
            }
        });
    }
};