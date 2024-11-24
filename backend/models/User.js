const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        
    },
    lastName :{
        type:String,
        require:true,

    },
    middleName :{
        type:String,
        require:false,

    },
    userType :{
        type:String,
        required:true,
        enum:['buyer', 'admin', 'seller']
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    isActive :{
        type:Boolean,
        required:true,
        default:true
    },
    password: {
        type:String,
        required:true,

    },
    authToken:{
        type:Number,
        required:true
    },
    authTokenVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken :{
        type:Number,
        required:false,
        default:null
    },
    resetPasswordExpires:{
        type:Date,
        request:false,
        default:null
    },
        
    logo: { type: String, required: false }, 

},{
    timestamps:true
});

const User = mongoose.model("User", UserSchema);


UserSchema.methods.deactivate = async function(){
    this.isActive =false;
    await this.save();
    return this;
};

UserSchema.methods.activate = async function(){
    this.isActive = true;
    await this.save();
    return this;
}

module.exports = User;