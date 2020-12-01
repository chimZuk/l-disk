const fs = require('fs');
const http = require('http');
const https = require('https');
const io = require('socket.io')(https);

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const resize = require('./controllers/resize');
const uri = require('./models/secret_data.js');
const error_h = require('./controllers/error');

const library = uri.library;
const passport = require('passport');
require('./models/db');
require('./config/passport');
const APIRoutes = require('./routes/index');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/photos.chimzuk.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/photos.chimzuk.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/photos.chimzuk.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

io.on('connection', function (socket) {
    socket.on('download', function (msg) {
        io.emit('downloaded', msg + ' downloaded');
    });
});

app.use('/', express.static(__dirname + '/dist'));

app.get('/mini/**', (req, res) => {
    res.type(`image/jpg`)
    resize(library + '/' + req.params[0], 'jpg', 100).pipe(res)
});

app.get('/small/**', (req, res) => {
    res.type(`image/jpg`)
    resize(library + '/' + req.params[0], 'jpg', 200).pipe(res)
});

app.get('/normal/**', (req, res) => {
    res.type(`image/jpg`)
    resize(library + '/' + req.params[0], 'jpg').pipe(res)
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', APIRoutes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

const redirection = express();

redirection.get('*', function (req, res) {
    res.redirect('https://' + req.headers.host + req.url);
});


const httpServer = http.createServer(redirection);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8081, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(8001, () => {
    console.log('HTTPS Server running on port 8001');
});
