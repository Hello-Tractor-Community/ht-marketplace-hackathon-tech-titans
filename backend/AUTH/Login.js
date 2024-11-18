const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const loginAuditMiddleware = require('../middleware/LOGINAUDITS');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


router.post('/',
    loginAuditMiddleware,
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Server error during authentication', error: err.message });
            }
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed', message: info ? info.message : 'Invalid credentials' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Server error during login', error: err.message });
                }

                const token = jwt.sign(
                    { id: user._id, email: user.email }, 
                    JWT_SECRET,
                    { expiresIn: '84h' }
                );
                const user_data = {
                    "id": user._id,
                    "email": user.email,
                    "userType": user.userType,
                    "isActive": user.isActive
                }

                return res.status(200).json({ message: 'Login successful', token, user_data });
            });
        })(req, res, next);
    }
);

module.exports = router;
