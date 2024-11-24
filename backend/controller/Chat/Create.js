const Chat = require('../../models/Chats');

const CreateChat = async(req,res) =>{
    try{
        const {user1 , user2}=req.body;
        const {_id} =req.user;
        
        console.log('Chat', req.body);

        const newChat = new Chat({
            user1:user1,
            user2:user2,
            createdBy:_id
        })

        await newChat.save();

        console.log('New Chat:', newChat);

        res.status(200).json({message:'Chat created Successfully', newChat:newChat});

    }catch(err){
        console.log('Error Creating Chat', err.message);
        res.status(500).json({message:'Error Creating Chat', error:err.message});
    };
};

module.exports = CreateChat;