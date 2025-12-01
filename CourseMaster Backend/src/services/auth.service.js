import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js"; // Utility for structured errors (not shown)
import config from "../config/config.js";

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, config.jwt.secret, {
        expiresIn: "1d",
    });
};

// Admin registration is often a seeder, but a service function is useful:
export const registerUser = async (userData) => {
    // 1. Check if user already exists
    if (await User.findOne({ email: userData.email })) {
        throw new ApiError(400, "User with this email already exists.");
    }
    // 2. Create and save the new user (password is hashed via pre-save hook)
    const user = await User.create(userData);

    // 3. Generate token
    const token = generateToken(user._id, user.role);
    // Remove password before returning
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
};

export const loginUser = async (email, password) => {
    // 1. Fetch user, explicitly selecting the password [cite: 19]
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password.");
    }

    // 2. Generate token
    const token = generateToken(user._id, user.role);
    // Remove password before returning
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
};