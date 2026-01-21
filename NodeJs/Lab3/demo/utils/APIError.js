class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isClientError = this.statusCode >= 400 && this.statusCode < 500;

        // this line captures the stack trace from Node.js Error class to our custom class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = APIError;