const mongoose = require('mongoose');

const MessageModel = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        receiver: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        message: {
            type: String, // Encrypted message stored as a string
            required: true,
        },
     
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


MessageModel.methods.activate = async function () {
    this.isActive = true;
    await this.save();
    return this;
};

MessageModel.methods.deactivate = async function () {
    this.isActive = false;
    await this.save();
    return this;
};

const Message = mongoose.model('Message', MessageModel);

module.exports = Message;
