module.exports = function error(error, req, res, code = 500, message = "Server error.") {
    return res.status(code).send({ error: error, message: message });
}