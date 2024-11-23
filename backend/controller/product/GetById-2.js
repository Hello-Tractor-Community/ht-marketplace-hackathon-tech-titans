const Product = require('../../models/Product');

const GetById = async(req,res) =>{
    try{
        const {productId} =req.params;
        console.log('productId', productId);

        

        let product = await Product.find({isActive:true, _id:productId});
       

        res.status(200).json({message:'Successfully retrieved product', product:product});

    }catch(err){
        console.log('Error Get By Id', err.message);
        res.status(500).json({message:'Error Get By Id', error:err.message});
    }
};

module.exports = GetById;