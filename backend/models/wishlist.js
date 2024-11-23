const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistModel = new mongoose.Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'Customer', // Reference to the Customer model
        },
        sessionId:{
            type:String,
            required:false
        },
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product', // Reference to the Product model
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isActive:{
            type:Boolean,
            required:true,
            default:true
        }
    },
    { timestamps: true }
);


WishlistModel.methods.activate = async function (){
    this.isActive = true;
    this.save();
    return this;
};

WishlistModel.methods.deactivate = async function(){
    this.isActive = false;
    this.save();
    return this;
};

const Wishlist = mongoose.model('Wishlist', WishlistModel);


module.exports = Wishlist;
