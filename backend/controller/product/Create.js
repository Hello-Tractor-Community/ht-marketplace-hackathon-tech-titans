const Product = require('../../models/Product');
const multer = require('multer');
const path = require('path');

// Multer configuration for product images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/products/'); // Directory to save product images
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit per file
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            return callback(null, true);
        } else {
            callback(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
        }
    },
});

const uploadMultipleImages = upload.array('images', 10); // Allow up to 10 images per product

const CreateProduct = async (req, res) => {
    console.log('User:', req.body);

    uploadMultipleImages(req, res, async (uploadError) => {
        if (uploadError) {
            console.error('Image upload error:', uploadError.message);
            return res.status(400).json({ success: false, message: uploadError.message });
        }

        try {
            const {
                name,
                price,
                location,
                availability,
                description,
                modelNumber,
                brand,
                year,
                engineType,
                horsepower,
                weight,
                dimensions,
                fuelCapacity,
                transmissionType,
                warranty,
                usageHour,
                typeProduct,
            } = req.body;
            console.log(req.body);
            // Validate required fields
            if (!name || !price || !location || !availability || !description) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields. Ensure all fields are provided.',
                });
            }

            let { _id } = req.user;

            // Parse and validate location
            const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
            if (
                !parsedLocation ||
                typeof parsedLocation.longitude !== 'number' ||
                typeof parsedLocation.latitude !== 'number' ||
                typeof parsedLocation.placeName !== 'string'
            ) {
                throw new Error('Invalid location format. Include longitude, latitude, and placeName.');
            }

            // Parse and validate dimensions if provided
            let parsedDimensions = null;
            if (dimensions) {
                parsedDimensions = typeof dimensions === 'string' ? JSON.parse(dimensions) : dimensions;
                if (
                    typeof parsedDimensions.length !== 'number' ||
                    typeof parsedDimensions.width !== 'number' ||
                    typeof parsedDimensions.height !== 'number'
                ) {
                    throw new Error('Invalid dimensions format. Include numeric length, width, and height.');
                }
            }

            // Handle uploaded images
            const images = req.files ? req.files.map((file) => `/uploads/products/${file.filename}`) : [];

            // Create the product
            const product = new Product({
                name,
                price,
                location: parsedLocation,
                availability,
                images,
                description,
                modelNumber,
                brand,
                year,
                engineType,
                horsepower,
                weight,
                dimensions: parsedDimensions,
                fuelCapacity,
                transmissionType,
                warranty,
                createdBy: _id,
                usageHour,
                typeProduct,
            });

            // Save product to the database
            await product.save();
            res.status(201).json({ success: true, product });
        } catch (error) {
            console.error('Error creating product:', error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    });
};


module.exports = CreateProduct;
