const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const passport = require('passport');
const session = require('express-session');
process.env.TZ = 'Africa/Nairobi';
require('dotenv').config();


const initializePassport = require('./middleware/PASSPORTCONFIG');
const { connectToMongoDB } = require('./utils/DbConnection');
const Login = require('./AUTH/Login');
const CheckSession = require('./AUTH/CheckSession');
const VerifySignUpToken = require('./AUTH/AUTHENTICATESIGNUPTOKEN');
const signUp = require('./routes/Users');
const Product =require('./routes/Product')
// const checkSession = require('./middleware/check-session');


initializePassport(passport);
connectToMongoDB();

const app = express();

app.use(logger('dev'));
app.use(express.json()); // Handles JSON body
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({ origin: '*' })); 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());
app.use(passport.session());


//  add routes here below
app.use('/api/auth/check-session',CheckSession);
app.use('/api/auth/login', Login);
app.use('/api/auth/verify-sign-up-token', VerifySignUpToken);
app.use('/api/register', signUp);
app.use('/api/product', Product);
const mongoUri = process.env.MONGO_URI || '';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
        app.listen(6000, () => {
            console.log('Server running on port 8888');
            console.log('Application running on http://localhost:8888')
        });
    })
    .catch((err) => {
        console.log('Connection Failed!', err.message);
    });

module.exports =app;