const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/:email/:token', async(req,res) =>{
    try{
        const {email, token} =req.params;
        console.log(`Email: ${email}`);
        console.log(`Token: ${token}`);

        if (!email || !token) {
            return res.status(400).json({ success: false, message: 'Email or token is missing' });
        }
        console.log(21)
        const user = await User.find({email});
        console.log(333)
        if(!user){
            return res.status(404).json({message:'No user found'});
        };

       console.log(user)

        if(token.toString() !== user[0].authToken.toString()){
            console.log(token)
            console.log(user[0].authToken)
            return res.status(403).json({message:'Wrong Token'})
        }
        try {
            const data = {
                authTokenVerified: true
            };
        
            // Update the user document based on email
            const updatedUser = await User.findOneAndUpdate(
                { email: email }, // Match document where email matches
                data,             // Fields to update
                { new: true }     // Return the updated document
            );
        
            if (!updatedUser) {
                console.log('User not found with the provided email.');
            } else {
                console.log('User updated successfully:', updatedUser);
                return res.status(200).json({message:'User token verified'})
            }
        } catch (err) {
            console.error('Error verifying token:', err);
        }
        

    }catch(err){
        console.log('Error verifying token');
        res.status(500).json({message:'Error verifying token'});
    }
});

module.exports = router