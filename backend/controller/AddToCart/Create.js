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

        // Find if the product is already in the cart
        let cartItem = await AddToCart.findOne({
            'product.id': productId,
            ...cartQuery,
        });

        if (cartItem) {
            // Update existing cart item
            cartItem.quantity += quantity;
            cartItem.totalPrice = cartItem.quantity * product.price;

            // Ensure product images are updated correctly
            cartItem.product.images = product.images || [];
            await cartItem.save();

            console.log('Updated cart item:', cartItem);
        } else {
            // Create a new cart item
            cartItem = await AddToCart.create({
                product: {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    type: productType,
                    images: product.images || [], // Assign images from the product
                },
                quantity,
                totalPrice: quantity * product.price,
                sessionId: sessionId || null,
                user: req.user?._id || null,
            });

            console.log('Created new cart item:', cartItem);
        }

        res.status(200).send(cartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send('An error occurred while adding to cart.');
    }
};

module.exports = AddToCartMethod;
