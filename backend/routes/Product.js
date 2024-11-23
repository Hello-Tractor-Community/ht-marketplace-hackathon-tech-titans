const express = require('express');
const router = express.Router();
const CreateProduct = require('../controller/product/Create');
const GetProduct = require('../controller/product/Get');
const GetProduct2 = require('../controller/product/Get-2');
const GetProductById = require('../controller/product/GetById');
const GetProductById2 = require('../controller/product/GetById-2');
const { multerPropertyImages } = require('../utils/FileUpload');
const AUTHENTICATJWT = require('../middleware/AUTHENTICATEJWT');
const ActivateDeactivate = require('../controller/product/Activate&Deactivate');

router.post('/add',AUTHENTICATJWT, multerPropertyImages.array('images', 5),CreateProduct);

router.get('/get',AUTHENTICATJWT ,GetProduct );

router.get('/get-2', GetProduct2);

router.get('/get/:productId', AUTHENTICATJWT, GetProductById);

router.get('/get-2/:productId', GetProductById2);

router.delete('/activate-deactivate/:productId', AUTHENTICATJWT, ActivateDeactivate);
module.exports = router;


