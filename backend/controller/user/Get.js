const User = require('../../models/User');

exports.getAllUsers = async (req, res) => { 
    try {
        // Ensure that the user is authenticated and their role is available
        if (!req.user || !req.user.type) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Check the role of the requesting user
        const requestingUserType = req.user.type;
        
        let users;
        
        if (requestingUserType === 'normal') {
            // If the requesting user is normal, exclude other normal users
            users = await User.find({ type: { $ne: 'normal' } });
        } else if(req.user.userType === 'admin') {
            // If the requesting user is not normal, return all users
            users = await User.find();
        }else {
            return res.status(403).json({message:'Access denied'});
        }

        res.status(200).json({data:users, message:'User retried successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
