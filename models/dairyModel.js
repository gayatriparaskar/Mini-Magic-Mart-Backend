const mongoose = require ("mongoose");

const dairySchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true
     },
     offerprice:{
        type:Number
     },
     category:{
        type:String,
        required:true
     },
     rate:{
        type:Number,
        enum:[1,2,3,4,5],
        default:1
     },
     offerrate:{
        type:Number
     },
     image:{
        type:String,
        required:true
     }
});

const DairyModel = new mongoose.model("dairyData",dairySchema);

module.exports = DairyModel ; 