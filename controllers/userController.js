const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
require("dotenv").config();
const SALT_ROUND = Number(process.env.SALT_ROUND);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// console.log(SALT_ROUND);

module.exports.createUser = async (req,res)=>{
    try {
        console.log("hello");
        const data = req.body;
        console.log(data);
        const hashPassword = await bcrypt.hash(data.password,SALT_ROUND);
        // delete req.body.password;
        data.password= hashPassword;
        const createUsers = new UserModel(data);
        await createUsers.save();
        res.status(200).json({message:"User is created successfully",createUsers});
    } catch (error) {
        res.status(500).json({message:"User is not created",details:error.message});
    }
};

module.exports.loginAdmin =async (req,res)=>{
    try {
        const {email , password }=req.body;
       
        const exitingemail = await UserModel.findOne({email});
        if (!exitingemail) {
            return res.status(404).json({ message: "You are not Registered" });
        }
    
       const compare=await bcrypt.compare(password,exitingemail.password);
       if (!compare) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(ACCESS_TOKEN_SECRET);
    
       const token = jwt.sign({id: exitingemail._id},ACCESS_TOKEN_SECRET);
       res.status(200).json({message:"Login Successfully",token});
       
    } catch (error) {
        res.status(500).json({message:"Server error",details:error.message});
    }
}
