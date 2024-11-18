const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const checkSession = async (req, res) => {
    try {
        
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
            userType: user.userType,
            email: user.email,
            isActive: user.isActive
        };

        return res.status(200).json({ message: 'Session valid', user: userData });
    } catch (error) {
        console.error('Error in checkSession middleware:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token.', error: error.message });
    }
};

module.exports = checkSession;
