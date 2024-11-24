const express = require('express');
const router = express.Router();
const { CreateUser, uploadSingleImage } = require('../controller/user/User');
const { getAllUsers } = require('../controller/user/Get')
const {DeleteUser} = require('../controller/user/DeleteUser');
const Login = require('../AUTH/Login');
const authenticateJWT = require('../middleware/AUTHENTICATEJWT');
const FILEUPLOADV2 = require('../utils/FileUploadV2');
// POST request to create a new user
router.post('/sign-up', CreateUser);
router.get('/users', authenticateJWT, getAllUsers)
router.delete('/users/:id/deactivate', authenticateJWT, DeleteUser);

// router.post('/login', Login);
// router.patch('/update/:id',authenticateJWT,UpdateUser )

module.exports = router;
