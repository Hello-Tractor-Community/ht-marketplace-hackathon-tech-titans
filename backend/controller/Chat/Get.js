const Chat = require('../../models/Chats');
const mongoose = require('mongoose');

const GetChats = async (req, res) => {
    try {
        const { _id: userId } = req.user; // Assuming `req.user` contains the authenticated user's details

        console.log('user ID:', userId);

        // Ensure userId is an ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Query to find chats where the user is either user1 or user2 and the chat is active for them
        const chats = await Chat.find({
            $or: [
                { user1: userObjectId, isActiveUser1: true },
                { user2: userObjectId, isActiveUser2: true },
            ],
        })
            .populate('user1', 'firstName email') // Populate user1 details
            .populate('user2', 'firstName email'); // Populate user2 details

        // Respond with the filtered chats
        res.status(200).json({
            message: 'Chats retrieved successfully',
            chats,
        });
    } catch (err) {
        console.error('Error retrieving chats:', err.message);
        res.status(500).json({
            message: 'Error retrieving chats',
            error: err.message,
        });
    }
};

module.exports = GetChats;
