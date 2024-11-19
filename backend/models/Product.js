const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxLength: 60
        },
        price:{
            type:Number,
            required:true,
            min:0,
            maxLength:8
        },
        location:{
            longitude:{type:String ,required:true},
            latitude:{type:String ,required:true},
            placeName:{type:String ,required:true}
        },
        availability:{
            type:Boolean,
            default:false,
            required:true
        },
        typeProduct: {
            type: String,
            required: true,
            enum: ['tractor', 'spare'], // Allowed values
            validate: {
                validator: function (v) {
                    return ['tractor', 'spare'].includes(v.toLowerCase());
                },
                message: 'Invalid typeProduct value. Must be either "tractor" or "spare".',
            },
        },
        usageHour:{
            type:Number,
            required:false,
           
        },
        images: {
            type: [String],
            required: false
        },
        description:{
            type:String,
            required:true,
            maxLength:500
        },
        modelNumber: {
            type: String,
            maxLength: 50
        },
        brand: {
            type: String,
            maxLength: 100
        },
        year: {
            type: Number, // The manufacturing year of the tractor
            min: 1900,
            max: new Date().getFullYear()
        },
        engineType: {
            type: String,
            maxLength: 100 // Describes the type of engine (e.g., diesel, electric)
        },
        horsepower: {
            type: Number,
            min: 0 // Represents the power of the tractor
        },
        weight: {
            type: Number, // The weight of the tractor in kilograms
            min: 0
        },
        dimensions: {
            length: { type: Number, min: 0 },
            width: { type: Number, min: 0 },
            height: { type: Number, min: 0 }
        },
        fuelCapacity: {
            type: Number, // The fuel tank capacity in liters
            min: 0
        },
        transmissionType: {
            type: String,
            maxLength: 50 // Describes the transmission type (e.g., manual, automatic)
        },
        warranty: {
            type: String, 
            maxLength: 100
        },
        isActive:{
            type:Boolean,
            required:true,
            default:true
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'User'
        }
    },
    {
        timestamps:true
    }
);


ProductModel.methods.deactivate = async function() {
    this.isActive = false;
    this.save();
    return this;
};


ProductModel.methods.activate = async function(){
    this.isActive = true;
    this.save();
    return this;
};


const Product = new mongoose.model('Product', ProductModel);


module.exports = Product;