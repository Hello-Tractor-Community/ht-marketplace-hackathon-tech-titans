const Wishlist = require('./models/Wishlist'); // Path to Wishlist model

const addItemToWishlist = async (customerId, productId) => {
    let wishlist = await Wishlist.findOne({ customer: customerId });

    if (!wishlist) {
        wishlist = new Wishlist({ customer: customerId, items: [] });
    }

    // Check if the item already exists
    const itemExists = wishlist.items.some(
        (item) => item.productId.toString() === productId.toString()
    );

    if (!itemExists) {
        wishlist.items.push({ productId });
        await wishlist.save();
    } else {
        console.log('Item already in wishlist');
    }

    return wishlist;
};


module.exports = addItemToWishlist;