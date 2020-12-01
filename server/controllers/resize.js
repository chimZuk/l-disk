const fs = require('fs')
const sharp = require('sharp')
const error_h = require('./error')

module.exports = function resize(path, format, width, height) {
    const readStream = fs.createReadStream(path)
    readStream.on('error', function (error) {
        error_h(error, req, res, 404, "File not found.")
    });
    let transform = sharp()

    if (format) {
        transform = transform.toFormat(format)
    }

    if (width || height) {
        transform = transform.resize(width, height)
    }

    return readStream.pipe(transform)
}