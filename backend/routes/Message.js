const express = require('express');
const router = express.Router();
const Message = require('../controller/Message/Create');
const AUTHENTICATJWT = require('../middleware/AUTHENTICATEJWT');

router.post('/create', AUTHENTICATJWT, Message);



module.exports = router;