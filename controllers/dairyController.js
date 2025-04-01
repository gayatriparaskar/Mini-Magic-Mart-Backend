const DairyModel = require("../models/dairyModel");
const express = require("express");

module.exports.createDairy = async(req,res)=>{
    try {
        const data = req.body;
        const newDairy = await FruitModel(data);
        newDairy.save();
        res.status(200).json({message:"Dairy product is uploded successfully",newDairy});
    } catch (error) {
        res.status(500).json({message:"Dairy product is not uploded"})
    }
};


module.exports.getDairy = async (req,res)=>{
    try {
        const getDairyData = await DairyModel.find();
        res.status(200).json({message:"All fruits data ",getDairyData});
    } catch (error) {
        res.status(500).json({message:"fruits not found",details:error.message});
    }
};

module.exports.updateDairy = async (req,res)=>{
    try {
        const id=req.body.id;
        const query = req.body;
        const updatedDairy = new DairyModel.findByIdAndUpdate(id,query,{
            new:true,
            runValidators:true
        })
        res.status(200).json({message:"Fruit is updated successfully",updatedDairy});
    } catch (error) {
        res.status(500).json({message:"fruits not found",details:error.message});

    }
};

module.exports.deleteDairy = async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedDairy = await DairyModel.findByIdAndDelete(id);
        res.status(200).json({message:"Fruti is deleted",deletedFruit});
    } catch (error) {
        res.status(500).json({message:"Fruit is not deleted",details:error.message})
    }
}
 