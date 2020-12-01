const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const uri = require('../models/secret_data.js');

const auth = jwt({
    secret: uri.secret,
    userProperty: 'payload'
});

const profile = require('../controllers/profile');
const authentication = require('../controllers/authentication');
const files = require('../controllers/files');

router.post('/profile', auth, profile.profileRead);
router.post('/albums.get', auth, profile.getAlbums);
router.post('/album.create', auth, profile.createAlbum);
router.post('/album.delete', auth, profile.deleteAlbum);

router.post("/photos.upload", auth, profile.uploadPhotos);
router.post("/photos.get", auth, profile.getPhotos);
router.post("/photo.delete", auth, profile.deletePhoto);

router.post('/register', authentication.register);
router.post('/login', authentication.login);

router.post("/small/**", auth, files.getFile);

module.exports = router;