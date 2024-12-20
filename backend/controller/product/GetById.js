const Product = require('../../models/Product');

const GetById = async(req,res) =>{
    try{
        const {productId} =req.params;
        console.log('productId', productId);

        const user =req.user;

        let product;
        if(user.userType ==='seller'){
            return product = await Product.find({isActive:true, createdBy:user._id, _id:productId});
        }
        else if(user.userType ==='admin'){
            return product = await Product.find({_id:user._id});
        }

        res.status(200).json({message:'Successfully retrieved product', product:product});

    }catch(err){
        console.log('Error Get By Id', err.message);
        res.status(500).json({message:'Error Get By Id', error:err.message});
    }
};

module.exports = GetById;