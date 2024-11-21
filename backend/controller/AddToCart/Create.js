const Product = require('../../models/Product');
const AddToCart = require('../../models/AddToCart');

const AddToCartMethod = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const sessionId = req.cookies.sessionId;

        if (!sessionId && !req.user) {
            return res.status(400).send('Session ID or user authentication is required.');
        }

        const cartQuery = req.user ? { user: req.user._id } : { sessionId };

        // Fetch the product from the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found.');
        }

        // Ensure product type is passed correctly
        const productType = product.typeProduct || product.type;
        if (!productType) {
            return res.status(400).send('Product type is missing.');
        }

        let cartItem = await AddToCart.findOne({
            'product.id': productId,
            ...cartQuery,
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * product.price;
            await cartItem.save();
        } else {
            cartItem = await AddToCart.create({
                product: {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    type: productType, // Ensure correct field is passed
                },
                quantity,
                totalPrice: quantity * product.price,
                sessionId: sessionId || null,
                user: req.user?._id || null,
            });
        }

        res.status(200).send(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding to cart.');
    }
};

module.exports = AddToCartMethod;
