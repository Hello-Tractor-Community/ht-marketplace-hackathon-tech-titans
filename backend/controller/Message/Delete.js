const Message = require('../../models/Message');


const DeleteMessage =async(req,res) =>{
    try{
        const {messageId} =req.params;

        if(!messageId){
            return res.status(400).json({message:'Message ID Requires'});
        };

        const message = await Message.findOne({_id:messageId});

        if(!message){
            return res.status(400).json({message:'Message Not Found'});
        };
        console.log(message.sender);
        console.log(req.user._id);
        if(message.sender.toString() !== req.user._id.toString()){
            return res.status(403).json({message:'User an authorized'});
        };

        await message.deactivate();

        res.status(201).json({message:'Message Deleted Successfully'});

    }catch(err){
        console.log('Error Deleting Message', err.message);
        res.status(500).json({message:'Error Deleting Message',error:err.message});
    };
};

module.exports =DeleteMessage;