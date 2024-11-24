const User = require('../../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        // Ensure that the user is authenticated and their role is available

        if (!req.user || !req.user.userType) {
            return res.status(403).json({ message: 'Access denied' });
        }


        // Check the role of the requesting user
        const requestingUserType = req.user.userType;

        // Restrict access for non-admin users
        if (requestingUserType !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Insufficient privileges' });
        }

        // Extract query parameters for pagination and filtering
        const { search, userType, isActive, page = 1, limit = 10 } = req.query;

        // Build query conditions
        const query = {};
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (isActive) query.isActive = isActive;
        if (userType) query.userType = userType;

        // Execute the query with pagination
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select('-password'); // Exclude sensitive fields like password

        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            data: users,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: Number(page),
            totalUsers,
            message: 'Users retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'An error occurred while fetching users' });
    }
};
