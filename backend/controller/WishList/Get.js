const WishList = require('../../models/wishlist');
const Product = require('../../models/Product');

const GetWishList = async (req, res) => {
    try {
        let wishlist;

        if (req.user) {
            // Authenticated user: use customer ID from `req.user`
            const customerId = req.user._id;
            wishlist = await WishList.findOne({ customer: customerId })
                .populate('items.productId', 'name price description brand images location'); // Adjust fields as needed
        } else if (req.cookies.sessionId) {
            // Unauthenticated user: use `sessionId` from cookies
            const sessionId = req.cookies.sessionId;
            wishlist = await WishList.findOne({ sessionId })
                .populate('items.productId', 'name price description brand images location'); // Adjust fields as needed
        } else {
            return res.status(401).json({
                success: false,
                message: 'User must be authenticated or have a valid session.',
            });
        }

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Wish List retrieved successfully',
            wishlist,
        });
    } catch (err) {
        console.error('Error Getting Wishlist:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error Getting Wishlist',
            error: err.message,
        });
    }
};

module.exports = GetWishList;
