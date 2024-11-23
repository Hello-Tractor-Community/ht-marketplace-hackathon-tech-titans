const Product = require('../../models/Product');

const GetProducts = async(req,res) =>{
    try {
       

            let activeProducts  = await Product.find({ isActive: true });
       
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