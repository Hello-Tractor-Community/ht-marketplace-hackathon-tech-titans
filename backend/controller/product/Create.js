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
            usageHour,
            typeProduct
        } = req.body;

        // Validation: Check if all required fields are present
        if (
            !name ||
            !price ||
            !location ||
            !availability ||
            !description
        ) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields. Ensure all fields are provided.',
            });
        }

        let { id } = req.user;

        // Parse and validate location field
        let parsedLocation;
        try {
            // If location is a string, parse it; otherwise, assume it's already an object
            parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;

            if (
                !parsedLocation ||
                typeof parsedLocation !== 'object' ||
                typeof parsedLocation.longitude !== 'number' ||
                typeof parsedLocation.latitude !== 'number' ||
                typeof parsedLocation.placeName !== 'string'
            ) {
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
                // If dimensions is a string, parse it; otherwise, assume it's already an object
                parsedDimensions = typeof dimensions === 'string' ? JSON.parse(dimensions) : dimensions;

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

        // Create product
        const product = new Product({
            name,
            price,
            location: parsedLocation,
            availability,
            images: null, // Adjust this to handle uploaded images
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
            createdBy: id,
            usageHour,
            typeProduct
        });

        // Save product to DB
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = CreateProduct;
