const Wishlist = require('../../models/wishlist');

const AddItemToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
        }

        // Determine the customer ID or session ID for the wishlist
        let wishlist;
        if (req.user) {
            // Authenticated user: use customer ID from `req.user`
            const customerId = req.user._id;
            wishlist = await Wishlist.findOne({ customer: customerId });
            if (!wishlist) {
                wishlist = new Wishlist({ customer: customerId, items: [] });
            }
        } else if (req.cookies.sessionId) {
            // Unauthenticated user: use `sessionId` from cookies
            const sessionId = req.cookies.sessionId;
            wishlist = await Wishlist.findOne({ sessionId });
            if (!wishlist) {
                wishlist = new Wishlist({ sessionId, items: [] });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: 'User must be authenticated or have a valid session.',
            });
        }

        // Check if the item already exists in the wishlist
        const itemExists = wishlist.items.some(
            (item) => item.productId.toString() === productId.toString()
        );

        if (!itemExists) {
            // Add the item to the wishlist
            wishlist.items.push({ productId });
            await wishlist.save();
            return res.status(200).json({
                success: true,
                message: 'Item added to wishlist',
                wishlist,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: 'Item is already in the wishlist',
                wishlist,
            });
        }
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add item to wishlist',
            error: error.message,
        });
    }
};

module.exports = AddItemToWishlist;
