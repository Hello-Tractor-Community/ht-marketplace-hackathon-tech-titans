const Chat = require('../../models/Chats');
const User = require('../../models/User'); // Import User model

const CreateChat = async (req, res) => {
    try {
        const { user1, user2 } = req.body;
        const { _id } = req.user;

        console.log('Chat', req.body);

        // Fetch user1 and user2 details to get their images
        const user1Data = await User.findById(user1).select('logo');
        const user2Data = await User.findById(user2).select('logo');

        if (!user1Data || !user2Data) {
            return res.status(404).json({ message: 'One or both users not found' });
        }

        // Check if the chat already exists between user1 and user2 (order doesn't matter)
        const existingChat = await Chat.findOne({
            $or: [
                { user1, user2 },
                { user1: user2, user2: user1 }
            ]
        });

        if (existingChat) {
            return res.status(200).json({ message: 'Chat already exists', existingChat });
        }

        // If no existing chat, create a new one
        const newChat = new Chat({
            user1: user1,
            user1Image: user1Data.logo || '', // Default to an empty string if no logo
            user2: user2,
            user2Image: user2Data.logo || '', // Default to an empty string if no logo
            createdBy: _id
        });

        await newChat.save();

        console.log('New Chat:', newChat);

        res.status(200).json({ message: 'Chat created successfully', newChat });

    } catch (err) {
        console.error('Error Creating Chat:', err.message);
        res.status(500).json({ message: 'Error Creating Chat', error: err.message });
    }
};

module.exports = CreateChat;
