import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

// 1. JWT Protection Middleware
export const protect = catchAsync(async (req, res, next) => {
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError(401, 'Not authorized, token failed or missing.'));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID from the decoded payload
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new ApiError(401, 'The user belonging to this token no longer exists.'));
    }

    // Attach user object (excluding password) to the request
    req.user = user;
    next();
});

// 2. Role Restriction Middleware
// e.g., restrictTo('Admin') to protect routes like Course Management [cite: 43]
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'You do not have permission to perform this action.'));
        }
        next();
    };
};