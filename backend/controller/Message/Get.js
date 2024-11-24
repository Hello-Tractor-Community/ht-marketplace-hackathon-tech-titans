const Message = require('../../models/Message');
const Chat = require('../../models/Chats');

const GetMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { _id: userId } = req.user; // Assuming `req.user` contains the authenticated user's details

        if (!chatId) {
            return res.status(400).json({ message: 'Provide Chat Reference' });
        }

        // Find the chat by ID
        const chat = await Chat.findOne({ _id: chatId });

        if (!chat) {
            return res.status(404).json({ message: 'No Chat Found' });
        }

        // Check if the authenticated user is part of the chat
        if (chat.user1.toString() !== userId.toString() && chat.user2.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized. You are not a participant in this chat.' });
        }

        // Fetch messages related to the chat
        const messages = await Message.find({ chat:chatId }).sort({ createdAt: 1 }); // Sort by creation time (ascending)

        res.status(200).json({
            message: 'Messages retrieved successfully',
            messages,
        });
    } catch (err) {
        console.error('Error Getting Messages:', err.message);
        res.status(500).json({
            message: 'Error Getting Messages',
            error: err.message,
        });
    }
};

module.exports = GetMessage;
