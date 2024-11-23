const express = require('express');
const router = express.Router();
const Wishlist = require('../controller/WishList/Get');
const AddItemToWishlist = require('../controller/WishList/Create');


router.get('/get', Wishlist);

router.post('/create', AddItemToWishlist);


module.exports = router;