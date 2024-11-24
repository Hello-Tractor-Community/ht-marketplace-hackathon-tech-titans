const Chat = require('../../models/Chats');

const DeleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { _id: userId } = req.user; // Assuming `req.user` contains the authenticated user's details

        console.log('chatId', chatId);
        console.log('userId',userId);
        if (!chatId) {
            return res.status(400).json({ message: 'Please Provide Chat ID' });
        }

        // Find the chat by ID
        const existingChat = await Chat.findOne({ _id: chatId });

        if (!existingChat) {
            return res.status(404).json({ message: 'Chat Not Found' });
        }

        console.log('existing chat', existingChat);
        // Check if the requesting user is part of the chat
        if (existingChat.user1.toString() === userId.toString()) {
            existingChat.isActiveUser1 = false;
        } else if (existingChat.user2.toString() === userId.toString()) {
            existingChat.isActiveUser2 = false;
        } else {
            return res.status(403).json({ message: 'Unauthorized. You are not part of this chat.' });
        }

        // Save the updated chat
        await existingChat.save();

        res.status(200).json({message: 'Chat Deleted successfully'});
    } catch (err) {
        console.error('Error Deleting Chat:', err.message);
        res.status(500).json({
            message: 'Error Deleting Chat',
            error: err.message,
        });
    }
};

module.exports = DeleteChat;
