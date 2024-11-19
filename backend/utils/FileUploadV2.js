const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/sellers'); // Ensure this path exists and is writable
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter (optional: to accept only specific file types)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

// Multer instance
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter,
});

// Middleware for single file upload
const uploadSingleImage = upload.single('logo');

module.exports = { uploadSingleImage };
