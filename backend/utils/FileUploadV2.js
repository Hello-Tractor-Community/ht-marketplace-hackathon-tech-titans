const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/agents/'); // Directory to save agent images
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        // Only accept specific file types
        const allowedFileTypes = /jpeg|jpg|png/;
        const mimeType = allowedFileTypes.test(file.mimetype);
        const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
            return callback(null, true);
        }
        callback(new Error('Only images (jpeg, jpg, png) are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload.single('logo'); // Expect a single file with the field name 'logo'
