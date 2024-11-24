const User = require('../../models/User');

exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the user is authenticated and has admin privileges
        if (!req.user || req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Find and update the user's isActive field to false
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'User deactivated successfully.',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Error deactivating user:', error);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
};
