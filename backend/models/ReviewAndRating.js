const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewAndRatingModel = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User', 
        },
        profileType: {
            type: String,
            required: true,
            enum: ['customer', 'agent'], 
        },
        profileId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User', 
        },
        name: {
            type: String,
            required: true, 
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5, 
        },
        review: {
            type: String,
            required: false, 
            maxLength: 500, 
        },
        createdAt: {
            type: Date,
            default: Date.now, // Automatically set the creation date
        },
        isActive:{
            type:Boolean,
            required:true,
            default:true
        }
    },
    { timestamps: true }
);

ReviewAndRatingModel.methods.activate = async function(){
    this.isActive = true;
    this.save();
    return this;
};

ReviewAndRatingModel.methods.deactivate = async function(){
    this.isActive = false,
    this.save();
    return this;
};


const ReviewAndRating = mongoose.model('ReviewAndRating', ReviewAndRatingModel);

module.exports = ReviewAndRating;
