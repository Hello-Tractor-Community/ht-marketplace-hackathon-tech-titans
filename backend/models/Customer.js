const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerModel = new mongoose.Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        isActive:{
            type:Boolean,
            required:true,
            default:true
        }
    }
);


const Customer = new mongoose.model('Customer', CustomerModel);


module.exports = Customer;