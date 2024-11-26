const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const passport = require('passport');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
process.env.TZ = 'Africa/Nairobi';
require('dotenv').config();

const initializePassport = require('./middleware/PASSPORTCONFIG');
const { connectToMongoDB } = require('./utils/DbConnection');
const Login = require('./AUTH/Login');
const CheckSession = require('./AUTH/CheckSession');
const VerifySignUpToken = require('./AUTH/AUTHENTICATESIGNUPTOKEN');
const signUp = require('./routes/Users');
const Product = require('./routes/Product');
const AddToCart = require('./routes/AddToCart');
const WishList = require('./routes/WishList');
const Message = require('./routes/Message');
const Chat = require('./routes/Chat');
const User = require('./routes/Users');

// Initialize Passport and MongoDB connection
initializePassport(passport);
connectToMongoDB();

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        allowedHeaders: ['my-custom-header', 'Content-Type'],
        credentials: true,
    },
});

app.use((req, res, next) => {
    req.io = io;
    req.io.userSocketMap = userSocketMap; // Attach userSocketMap to req.io
    next();
});

// Create a userSocketMap
const userSocketMap = new Map();
io.userSocketMap = userSocketMap;
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user registration
    socket.on('register', (userId) => {
        if (!userId) {
            console.log(`Registration failed: Missing userId for socket ${socket.id}`);
            return;
        }

        if (userSocketMap.has(userId)) {
            const existingSocketId = userSocketMap.get(userId);
            if (existingSocketId !== socket.id) {
                console.log(`Updating connection for user: ${userId}`);
            }
        }

        userSocketMap.set(userId, socket.id);
        console.log(`User registered: ${userId} -> ${socket.id}`);
        console.log('Current userSocketMap:', Array.from(userSocketMap.entries()));
    });

    // Handle new message event
    socket.on('send_message', (data) => {
        const { receiver, sender, message } = data;

        if (!receiver || !sender || !message) {
            console.log('Invalid message payload:', data);
            return;
        }

        const recipientSocketId = userSocketMap.get(receiver);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('new_message', data);
            console.log(`Message sent from ${sender} to ${receiver}`);
        } else {
            console.log(`User ${receiver} is not connected. Current userSocketMap:`, Array.from(userSocketMap.entries()));
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        const userId = [...userSocketMap.entries()].find(([_, id]) => id === socket.id)?.[0];
        if (userId) {
            userSocketMap.delete(userId);
            console.log(`User mapping removed: ${userId}`);
        }

        console.log('Current userSocketMap after disconnect:', Array.from(userSocketMap.entries()));
    });
});


// Configure session
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: MONGO_URI }),
    })
);

app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to generate a session ID for non-logged-in users
app.use((req, res, next) => {
    if (!req.cookies.sessionId && !req.isAuthenticated()) {
        const sessionId = uuidv4();
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        console.log(`Generated new session ID: ${sessionId}`);
    } else {
        res.locals.sessionId = req.cookies.sessionId; // Use existing sessionId
    }
    next();
});

// Routes
app.use('/api/auth/check-session', CheckSession);
app.use('/api/auth/login', Login);
app.use('/api/auth/verify-sign-up-token', VerifySignUpToken);
app.use('/api/register', signUp);
app.use('/api/product', Product);
app.use('/api/cart', AddToCart);
app.use('/api/wishlist', WishList);
app.use('/api/message', Message);
app.use('/api/chat', Chat);
app.use('/api/users', User);

// Connect to MongoDB and start the server
const mongoUri = process.env.MONGO_URI || '';
mongoose.connect(mongoUri).then(() => {
    console.log('Connected to database!');
    server.listen(5500, () => {
        console.log('Server running on port 5500');
        console.log('Application running on http://localhost:5500');
    });
}).catch((err) => {
    console.error('Connection Failed!', err.message);
});

module.exports = app;