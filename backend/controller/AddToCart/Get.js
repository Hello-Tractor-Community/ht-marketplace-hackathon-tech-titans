const AddToCart = require('../../models/AddToCart');

const GetCartItems = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;

        if (!sessionId && !req.user) {
            return res.status(400).send('Session ID or user authentication is required.');
        }

        const cartQuery = req.user ? { user: req.user._id } : { sessionId };

        // Fetch all cart items for the current session or user
        const cartItems = await AddToCart.find(cartQuery);

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).send('No items found in the cart.');
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching cart items.');
    }
};

module.exports = GetCartItems;
