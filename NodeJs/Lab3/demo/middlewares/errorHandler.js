const APIError = require('../utils/APIError');

module.exports = (err, req, res, next) => {
    console.error("❌❌ Error:", err.stack);

    if (err instanceof APIError) {
        return res.status(err.statusCode).json({ message: err.message, success: false, isClientError: err.isClientError })
    }

    // mongoose errors
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id format", success: false, isClientError: true })
    }
    if (err.code === 11000 && err.name === "MongoServerError") {
        return res.status(400).json({ message: `resource already exists ${Object.keys(err.keyValue)[0]} : ${err.keyValue[Object.keys(err.keyValue)[0]]}`, success: false, isClientError: true })
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message, success: false, isClientError: true })
    }


    res.status(500).json({ message: "Internal server error", success: false, isClientError: false })
}