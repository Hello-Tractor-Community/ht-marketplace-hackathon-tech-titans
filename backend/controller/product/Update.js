const Product = require('../../models/Product');

const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from URL
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
            userId, // User ID trying to update the product
        } = req.body;

        // Fetch the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Ensure only the creator can update the product
        if (product.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to update this product',
            });
        }

        // Handle optional fields and validate them
        if (location) {
            try {
                const parsedLocation = JSON.parse(location);
                if (!parsedLocation.longitude || !parsedLocation.latitude || !parsedLocation.placeName) {
                    throw new Error('Invalid location format. Include longitude, latitude, and placeName.');
                }
                product.location = parsedLocation;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid location format. Expected JSON with longitude, latitude, and placeName.',
                });
            }
        }

        if (dimensions) {
            try {
                const parsedDimensions = JSON.parse(dimensions);
                if (
                    typeof parsedDimensions.length !== 'number' ||
                    typeof parsedDimensions.width !== 'number' ||
                    typeof parsedDimensions.height !== 'number'
                ) {
                    throw new Error('Invalid dimensions format. Expected numeric length, width, and height.');
                }
                product.dimensions = parsedDimensions;
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid dimensions format. Expected JSON with numeric length, width, and height.',
                });
            }
        }

        // Update the product fields
        if (name) product.name = name;
        if (price) product.price = price;
        if (availability !== undefined) product.availability = availability;
        if (description) product.description = description;
        if (modelNumber) product.modelNumber = modelNumber;
        if (brand) product.brand = brand;
        if (year) product.year = year;
        if (engineType) product.engineType = engineType;
        if (horsepower) product.horsepower = horsepower;
        if (weight) product.weight = weight;
        if (fuelCapacity) product.fuelCapacity = fuelCapacity;
        if (transmissionType) product.transmissionType = transmissionType;
        if (warranty) product.warranty = warranty;

        // Handle images update (optional)
        if (req.files && req.files.length > 0) {
            const images = req.files.map((file) => file.path);
            product.images = images; // Replace the existing images with new ones
        }

        // Save the updated product to DB
        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: error.message,
        });
    }
};

module.exports = UpdateProduct;
