const Message = require('../../models/Message');

const CreateMessage = async (req, res) => {
    const { receiver, message, sender, chat } = req.body;

    try {
        // Validate input
        if (!sender || !receiver || !message || !chat) {
            return res.status(400).json({
                success: false,
                message: 'Sender, receiver, message, and chat are required.',
            });
        }

        // Create a new message
        const newMessage = new Message({
            sender: req.user._id,
            receiver,
            message, // This will be encrypted in the pre-save hook
            chat,
        });

        await newMessage.save();

        // Retrieve the receiver's socket ID
        const recipientSocketId = req.io.userSocketMap.get(receiver);

        if (recipientSocketId) {
            // Emit WebSocket event to the receiver
            req.io.to(recipientSocketId).emit('new_message', {
                id: newMessage._id,
                sender: newMessage.sender,
                receiver: newMessage.receiver,
                message: newMessage.message,
                chat: newMessage.chat,
                createdAt: newMessage.createdAt,
            });
        } else {
            console.log(`User ${receiver} is not connected.`);
        }

        // Respond to the sender
        res.status(201).json({
            success: true,
            message: 'Message created successfully.',
            data: {
                id: newMessage._id,
                sender: newMessage.sender,
                receiver: newMessage.receiver,
                message: newMessage.message,
                chat: newMessage.chat,
                createdAt: newMessage.createdAt,
            },
        });
    } catch (err) {
        console.error('Error Creating Message:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error creating message.',
            error: err.message,
        });
    }
};

module.exports = CreateMessage;
