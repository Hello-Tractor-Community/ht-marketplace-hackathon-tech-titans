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

CustomerModel.methods.activate = async function(){
    this.isActive = true;
    this.save();
    return this;
};


CustomerModel.methods.deactivate = async function(){
    this.isActive =false;
    this.save();
    return this;
};


const Customer = new mongoose.model('Customer', CustomerModel);


module.exports = Customer;