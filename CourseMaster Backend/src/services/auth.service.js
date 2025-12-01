import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js"; // Utility for structured errors (not shown)
import config from "../config/config.js";

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, config.jwt.secret, {
        expiresIn: "1d",
    });
};

export const registerUser = async (userData) => {
    if (await User.findOne({ email: userData.email })) {
        throw new Error("User with this email already exists.");
    }
    const user = await User.create(userData);

    const token = generateToken(user._id, user.role);
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const token = generateToken(user._id, user.role);
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject, token };
};