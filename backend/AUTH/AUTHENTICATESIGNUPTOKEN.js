const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/:email/:token', async(req,res) =>{
    try {
        const { email, token } = req.params;

        if (!email || !token) {
            return res.status(400).json({ success: false, message: 'Email or token is missing' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        // Verify the provided token matches the user's authToken
        if (token.toString() !== user.authToken.toString()) {
            return res.status(403).json({ message: 'Wrong Token' });
        }

        // Update authTokenVerified to true
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { authTokenVerified: true },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Failed to update user. User not found.' });
        }

        // Generate JWT token
        const tokenPayload = { id: updatedUser._id, email: updatedUser.email };
        const jwtToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '84h' });

        res.status(200).json({
            message: 'User token verified successfully',
            token: jwtToken,
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                userType: updatedUser.userType,
                isActive: updatedUser.isActive,
            },
        });
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(500).json({ message: 'Error verifying token' });
    }
});

module.exports = router