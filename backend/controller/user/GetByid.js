const User = require('../../models/User');

const GetUserById = async(req,res) =>{
    try{
        const {userId} =req.params;

        const {userType} =req.user;

        if(userType !=='admin' ){
            return res.status(403).json({message:'User is an authorized'});
        }

        if(!userId){
            return res.status(400).json({message:'Please Provide User ID'});
        };

        const user = await User.findOne({_id:userId});

        if(!user){
            return res.status(400).json({message:'User Not Found'});
        };

        res.status(200).json({message:'User retrieved successfully', user:user});

    }catch(err){
        console.log('Error Getting User By ID', err.message);
        res.status(500).json({message:'Error Getting User by Id', error:err.message});
    };
};

module.exports = GetUserById;