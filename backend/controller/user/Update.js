const User = require('../../models/User');
const generateRandomOtp = require('../../utils/GenerateOtp');

const UpdateUserDetails = async(req,res) =>{
    try{
        const{id} = req.user;
        const {firstName, lastName, email, middleName,} = req.body;

        const data = {};
        const error = {};

        const user = await User.findOne({_id:id});
        
        if(!user){
            return res.status(404).json({message:'User not found'});
        };

        if(user._id !== id){
            firstName ? data.firstName = firstName.toLowerCase() :error.firstName ='First name required';
            middleName ? data.lastName = middleName.toLowerCase():error.middleName ='Middle name required';
            lastName ? data.lastName = lastName.toLowerCase() : error.lastName ='Last name required';
            email ? data.email = email.toLowerCase() : error.email ='Email required';

            if(error.firstName && error.lastName && error.email){
                return res.status(400).json({message:'No updates found'});
            }

            const updates = await User.findByIdAndUpdate(id,data,{new:true});

            res.status(201).json({message:'User data updated successfully', data:updates});
        }

    }catch(err){
        console.log('Error updating user details', err.message);
        res.status(500).json({message:'Error updating user details', error:err.message});
    }
};

module.exports = UpdateUserDetails;