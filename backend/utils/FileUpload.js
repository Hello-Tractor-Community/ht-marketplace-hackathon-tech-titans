const multer = require('multer');
const path = require('path');
const { getRandomUUID } = require('./GenerateUUID');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/products/')
    },
    filename: (req, file, callBack) => {
        callBack(
            null,
            file.fieldname + '-' + getRandomUUID() + path.extname(file.originalname),
        )
    },
})


var multerPropertyImages = multer({
    storage,
})

module.exports = {
    multerPropertyImages
};