const express = require('express');
const router = express.Router();
const { CreateUser, uploadSingleImage } = require('../controller/user/User');
const { getAllUsers } = require('../controller/user/Get');
const { DeleteUser } = require('../controller/user/DeleteUser');
const GetUserById = require('../controller/user/GetByid');
const Login = require('../AUTH/Login');
const authenticateJWT = require('../middleware/AUTHENTICATEJWT');
const FILEUPLOADV2 = require('../utils/FileUploadV2');

// POST request to create a new user with image upload
router.post('/sign-up', uploadSingleImage, CreateUser);

// GET request to retrieve all users (authentication required)
router.get('/users', authenticateJWT, getAllUsers);

// DELETE request to deactivate a user by ID (authentication required)
router.delete('/users/:id/deactivate', authenticateJWT, DeleteUser);

// GET request to retrieve a user by ID (authentication required)
router.get('/user/:userId', authenticateJWT, GetUserById);

// Uncomment these routes if needed in the future
// router.post('/login', Login);
// router.patch('/update/:id', authenticateJWT, UpdateUser);

module.exports = router;
