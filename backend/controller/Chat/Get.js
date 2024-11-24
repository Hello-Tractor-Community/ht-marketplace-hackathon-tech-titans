const Chat = require('../../models/Chats');
const Message = require('../../models/Message');
const mongoose = require('mongoose');

const GetChats = async (req, res) => {
    try {
        const { _id: userId } = req.user; // Assuming `req.user` contains the authenticated user's details
        console.log('user ID:', userId);

        // Ensure userId is an ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Use aggregation to fetch chats and the last message
        const chats = await Chat.aggregate([
            // Match chats where the user is either user1 or user2 and the chat is active
            {
                $match: {
                    $or: [
                        { user1: userObjectId, isActiveUser1: true },
                        { user2: userObjectId, isActiveUser2: true },
                    ],
                },
            },
            // Populate user1 and user2 details
            {
                $lookup: {
                    from: 'users', // Assuming "users" is the collection for user details
                    localField: 'user1',
                    foreignField: '_id',
                    as: 'user1Details',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user2',
                    foreignField: '_id',
                    as: 'user2Details',
                },
            },
            // Lookup the last message for each chat
            {
                $lookup: {
                    from: 'messages', // Assuming "messages" is the collection for messages
                    let: { chatId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$chat', '$$chatId'] },
                                isActive: true, // Filter to only active messages
                            },
                        },
                        { $sort: { createdAt: -1 } }, // Sort messages by createdAt (descending)
                        { $limit: 1 }, // Only get the most recent message
                    ],
                    as: 'lastMessage',
                },
            },
            // Unwind the lastMessage array to get a single message
            {
                $unwind: {
                    path: '$lastMessage',
                    preserveNullAndEmptyArrays: true, // In case there are no messages
                },
            },
        ]);

        // Respond with the populated chats
        console.log('Populated chats with last messages:', chats);
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
