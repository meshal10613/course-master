import * as authService from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';


export const register = catchAsync(async (req, res) => {
    const { user, token } = await authService.registerUser(req.body);
    res.status(201).json({ 
        status: 'success',
        user,
        token 
    });
});

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ 
        status: 'success',
        user,
        token 
    });
});

export const logout = (req, res) => {
    res.status(200).json({ status: 'success', message: 'Logged out successfully.' });
};