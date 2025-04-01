const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user" 
    },
    address:{
        street:String,
        city:String,
        state:String,
        country:String
    },
    pincode:{
        type:Number,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        enum:["Male","Female","Others"],
        required:true
    }
});

const UserModel = new mongoose.model("user",userSchema);

module.exports = UserModel ;