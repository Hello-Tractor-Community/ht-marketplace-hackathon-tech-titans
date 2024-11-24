const express = require('express');
const router = express.Router();
const Message = require('../controller/Message/Create');
const AUTHENTICATJWT = require('../middleware/AUTHENTICATEJWT');
const GetMessage =require('../controller/Message/Get');
const DeleteMessage =require('../controller/Message/Delete');
const UpdateMessage =require('../controller/Message/Update');

router.post('/create', AUTHENTICATJWT, Message);

router.get('/get/:chatId', AUTHENTICATJWT,GetMessage);

router.delete('/delete/:messageId', AUTHENTICATJWT, DeleteMessage);

router.put('/update/:messageId', AUTHENTICATJWT, UpdateMessage);

module.exports = router;