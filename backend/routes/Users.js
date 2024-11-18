const express = require('express');
const router = express.Router();
const {CreateUser,uploadSingleImage} = require('../controller/user/User');
const Login = require('../AUTH/Login');
const authenticateJWT = require('../middleware/AUTHENTICATEJWT');

// POST request to create a new user
router.post('/sign-up',uploadSingleImage, CreateUser);

// router.post('/login', Login);
// router.patch('/update/:id',authenticateJWT,UpdateUser )

module.exports = router;
