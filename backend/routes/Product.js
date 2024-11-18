const express = require('express');
const router = express.Router();
const CreateProduct = require('../controller/product/Create');
const GetProduct = require('../controller/product/Get');
const { multerPropertyImages } = require('../utils/FileUpload');
const AUTHENTICATJWT = require('../middleware/AUTHENTICATEJWT');

router.post('/add',AUTHENTICATJWT, multerPropertyImages.array('images', 5),CreateProduct);

router.get('/get',GetProduct );

module.exports = router;


