const express = require('express');
const checkSession = require('../middleware/CHECKSESSION'); 
const router = express.Router();


router.get('/', checkSession);

module.exports = router;
