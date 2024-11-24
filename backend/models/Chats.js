const mongoose = require('mongoose');

const ChatModel = new mongoose.Schema(
    {
        user1:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'User'
        },
        user2:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required:true
        },
        isActiveUser1:{
            type:Boolean,
            required:true,
            default:true,
        },
        isActiveUser2:{
            type:Boolean,
            required:true,
            default:true
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'User'
        }

    },
    {
        timestamps:true
    }
);


ChatModel.methods.activate = async function(){
    this.isActive =true;
    this.save();
    return this;
};

ChatModel.methods.deactivate = async function(){
    this.isActive =false;
    this.save();
    return this;
};

const Chat = new mongoose.model('Chat', ChatModel);


module.exports = Chat;