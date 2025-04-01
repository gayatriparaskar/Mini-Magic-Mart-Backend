const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const connectDB =async (req,res)=>{
    try {
      await  mongoose.connect(MONGO_URL)
        console.log("Connected to DB");
        
    } catch (error) {
        console.log("Not connected to DB");
        
    }
}

module.exports = connectDB ; 