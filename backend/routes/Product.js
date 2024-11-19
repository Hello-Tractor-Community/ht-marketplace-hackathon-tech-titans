const express = require('express');
const router = express.Router();
const CreateProduct = require('../controller/product/Create');
const GetProduct = require('../controller/product/Get');
const { multerPropertyImages } = require('../utils/FileUpload');
const AUTHENTICATJWT = require('../middleware/AUTHENTICATEJWT');
const ActivateDeactivate = require('../controller/product/Activate&Deactivate');

router.post('/add',AUTHENTICATJWT, multerPropertyImages.array('images', 5),CreateProduct);

router.get('/get',GetProduct );

router.delete('/activate-deactivate/:productId', AUTHENTICATJWT, ActivateDeactivate);
module.exports = router;


