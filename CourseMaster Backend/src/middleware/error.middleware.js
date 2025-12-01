const errorMiddleware = (err, req, res, next) => {
    // Default error values
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle Mongoose Bad ObjectId (CastError)
    if (err.name === 'CastError') {
        const path = err.path || 'resource';
        message = `Invalid ${path}: ${err.value}`;
        statusCode = 400;
    }

    // Handle Mongoose Duplicate Key Error (E11000)
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        message = `Duplicate field value: ${value}. Please use another value.`;
        statusCode = 400;
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError') {
        message = 'Invalid token. Please log in again.';
        statusCode = 401;
    }
    if (err.name === 'TokenExpiredError') {
        message = 'Token has expired. Please log in again.';
        statusCode = 401;
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.errors || []
    });
};

export default errorMiddleware;