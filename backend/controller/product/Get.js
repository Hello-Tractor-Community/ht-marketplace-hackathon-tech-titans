const Product = require('../../models/Product');

const GetProducts = async(req,res) =>{
    try {
        let activeProducts
        const user =req.user;
        console.log(user.userType);
        if(user.userType =='seller'){

            
            activeProducts = await Product.find({ isActive: true,createdBy:user._id });
        }
        else if(user.userType ==='admin') {
            activeProducts = await Product.find({});
        }
        
        // Fetch all products with isActive == true
        console.log(activeProducts);
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