const Product = require('../../models/Product');

const CreateProduct = async (req, res) => {
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
        } = req.body;

        // Validation: Check if all required fields are present
        if (
            !name ||
            !price ||
            !location ||
            !availability ||
            !description ||
            !req.files || req.files.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields. Ensure all fields are provided and images are uploaded.',
            });
        }
        let {id} =req.user; 
        // Parse and validate location field
        let parsedLocation;
        try {
            parsedLocation = JSON.parse(location);
            if (!parsedLocation.longitude || !parsedLocation.latitude || !parsedLocation.placeName) {
                throw new Error('Invalid location format. Include longitude, latitude, and placeName.');
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid location format. Expected JSON with longitude, latitude, and placeName.',
            });
        }

        // Parse and validate dimensions field if provided
        let parsedDimensions;
        if (dimensions) {
            try {
                parsedDimensions = JSON.parse(dimensions);
                if (
                    typeof parsedDimensions.length !== 'number' ||
                    typeof parsedDimensions.width !== 'number' ||
                    typeof parsedDimensions.height !== 'number'
                ) {
                    throw new Error('Invalid dimensions format. Expected numeric length, width, and height.');
                }
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid dimensions format. Expected JSON with numeric length, width, and height.',
                });
            }
        }

        // Handle images
        const images = req.files.map((file) => file.path);
        // Create product
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
            createdBy:id
        });

        // Save product to DB
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = CreateProduct;
