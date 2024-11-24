const express = require('express');
const router = express.Router();
const Chat = require('../controller/Chat/Create');
const GetChat =require('../controller/Chat/Get');
const AUTHENTICATJWT = require('../middleware/AUTHENTICATEJWT');
const DeleteChat =require('../controller/Chat/Delete');

router.post('/create', AUTHENTICATJWT, Chat);

router.get('/get', AUTHENTICATJWT,GetChat);

router.delete('/delete/:chatId', AUTHENTICATJWT, DeleteChat);


module.exports = router;