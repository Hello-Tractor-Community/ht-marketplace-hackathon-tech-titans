const express = require('express');
const router = express.Router();
const AddToCart = require('../controller/AddToCart/Create');
const GetCart = require('../controller/AddToCart/Get');

router.post('/create', AddToCart);

router.get('/get',GetCart);


module.exports =router;