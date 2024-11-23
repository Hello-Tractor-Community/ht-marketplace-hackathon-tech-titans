const Product = require('../../models/Product');

const GetProducts = async(req,res) =>{
    try {
        let activeProducts
        if(req.user.usertype ==='seller'){

            activeProducts = await Product.find({ isActive: true, createdBy:req.user._id });
        }
        else if(req.user.usertype ==='admin') {
            activeProducts = await Product.find({});
        }else{
            activeProducts = await Product.find({isActive:true});
        }
        // Fetch all products with isActive == true

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