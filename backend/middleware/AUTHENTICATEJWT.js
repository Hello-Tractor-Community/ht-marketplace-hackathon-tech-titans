const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Middleware to verify JWT and attach user to req.user
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes token is in the "Bearer [token]" format

    if (!token) return res.status(401).json({ success: false, message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid token' });

        // Attach user info to request object
        req.user = await User.findById(user.id).exec();
        next();
    });
};

module.exports = authenticateToken;
