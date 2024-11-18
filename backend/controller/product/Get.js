const Product = require('../../models/Product');

const GetProducts = async(req,res) =>{
    try {
        // Fetch all products with isActive == true
        const activeProducts = await Product.find({ isActive: true });

        // Return the list of active products
        res.status(200).json({
            success: true,
            products: activeProducts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch active products',
            error: error.message,
        });
    }
};


module.exports = GetProducts;