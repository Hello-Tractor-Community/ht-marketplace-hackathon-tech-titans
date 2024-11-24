const Message = require('../../models/Message');

const UpdateMessage = async(req,res) =>{
    try{
        const{message}=req.body;
        const {messageId} =req.params;

        if(!messageId){
            return res.status(400).json({message:'Please Provide Message id'});
        };

        if(!message){
            return res.status(400).json({message:'Please Provide Text Content'});
        };
        const existingMessage = await Message.findOne({_id:messageId});


        if(existingMessage.sender.toString() !== req.user._id.toString()){
            return res.status(403).json({message:'User an authorized'});
        };

        const updatedMessage = await Message.findByIdAndUpdate(messageId, {message:message}, {new:true});

        res.status(201).json({message:'Message updated Successfully', message:updatedMessage});

    }catch(err){
        console.log('Error Updating Message', err.message);
        res.status(500).json({message:'Error Updating Message', error:err.message});
    };
};

module.exports =UpdateMessage;