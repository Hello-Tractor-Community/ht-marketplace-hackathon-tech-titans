const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const EMAIL_USER = process.env.EMAIL_USER || 'your_email@example.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'your_email_password';

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

router.post('/:email/:token', async (req, res) => {
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

        // Send Welcome Email
        const mailOptions = {
            from: EMAIL_USER,
            to: updatedUser.email,
            subject: 'Welcome to Our Platform!',
            text: `Hello ${updatedUser.email},\n\nWelcome to our platform! Your account has been successfully verified.\n\nEnjoy your experience!\n\nBest Regards,\nThe Team`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending welcome email' });
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(200).json({
            message: 'User token verified successfully and welcome email sent',
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

module.exports = router;
