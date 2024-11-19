const Product = require('../../models/Product');
const User = require('../../models/User');

const ActivateDeactivate = async (req, res) => {
    try {
        const { productId } = req.params;
        const { _id: userId } = req.user;

        // Fetch the product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the product belongs to the authenticated user
        if (product.createdBy.toString() !== userId.toString()) {
            console.log(userId);
            return res.status(403).json({ message: 'User not authorized' });
        }

        console.log(product.isActive);

        // Toggle the product's active state
        if (product.isActive) {
            try {
                await product.deactivate();
                return res.status(200).json({ message: 'Product deactivated successfully' });
            } catch (error) {
                console.error('Error deactivating product:', error);
                return res.status(500).json({ message: 'Error deactivating product' });
            }
        } else {
            try {
                await product.activate();
                return res.status(200).json({ message: 'Product activated successfully' });
            } catch (error) {
                console.error('Error activating product:', error);
                return res.status(500).json({ message: 'Error activating product' });
            }
        }
    } catch (err) {
        console.error('Error activating/deactivating product:', err);
        return res.status(500).json({ message: 'Error activating/deactivating product' });
    }
};

module.exports = ActivateDeactivate;
