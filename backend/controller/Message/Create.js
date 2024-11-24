const Message = require('../../models/Message');

const CreateMessage = async (req, res) => {
    const { receiver, message, sender } = req.body;
    console.log(req.body);

    try {
        // Validate input
        if (!sender || !receiver || !message) {
            return res.status(400).json({
                success: false,
                message: 'Sender, receiver, and message are required.',
            });
        }

        // Create a new message
        const newMessage = new Message({
            sender: req.user._id,
            receiver,
            message, // This will be encrypted in the pre-save hook
        });

        await newMessage.save();

        // Trigger WebSocket event after message creation
        // Assuming `io` is the socket.io instance, broadcasting to the receiver
        io.to(receiver).emit('new_message', {
            id: newMessage._id,
            sender: newMessage.sender,
            receiver: newMessage.receiver,
            message: newMessage.message,
            createdAt: newMessage.createdAt,
        });

        res.status(201).json({
            success: true,
            message: 'Message created successfully.',
            data: {
                id: newMessage._id,
                sender: newMessage.sender,
                receiver: newMessage.receiver,
                createdAt: newMessage.createdAt,
            },
        });
    } catch (err) {
        console.error('Error Creating Message', err.message);
        res.status(500).json({
            success: false,
            message: 'Error creating message.',
            error: err.message,
        });
    }
};

module.exports = CreateMessage;
