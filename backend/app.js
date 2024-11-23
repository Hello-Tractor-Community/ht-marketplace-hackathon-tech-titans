const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const passport = require('passport');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid'); // For generating session IDs

process.env.TZ = 'Africa/Nairobi';
require('dotenv').config();

const initializePassport = require('./middleware/PASSPORTCONFIG');
const { connectToMongoDB } = require('./utils/DbConnection');
const Login = require('./AUTH/Login');
const CheckSession = require('./AUTH/CheckSession');
const VerifySignUpToken = require('./AUTH/AUTHENTICATESIGNUPTOKEN');
const signUp = require('./routes/Users');
const Product = require('./routes/Product');
const AddToCart =require('./routes/AddToCart');

// Initialize Passport and MongoDB connection
initializePassport(passport);
connectToMongoDB();

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));

// Configure session
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
}));

app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to generate a session ID for non-logged-in users
app.use((req, res, next) => {
    if (!req.cookies.sessionId && !req.isAuthenticated()) {
        const sessionId = uuidv4();
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        console.log(`Generated new session ID: ${sessionId}`);
    }
    next();
});

// Routes
app.use('/api/auth/check-session', CheckSession);
app.use('/api/auth/login', Login);
app.use('/api/auth/verify-sign-up-token', VerifySignUpToken);
app.use('/api/register', signUp);
app.use('/api/product', Product);
app.use('/api/cart',AddToCart);
// Connect to MongoDB and start the server
const mongoUri = process.env.MONGO_URI || '';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
        app.listen(8888, () => {
            console.log('Server running on port 5500');
            console.log('Application running on http://localhost:5500');
        });
    })
    .catch((err) => {
        console.error('Connection Failed!', err.message);
    });

module.exports = app;
