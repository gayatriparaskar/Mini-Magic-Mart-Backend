const express = require("express");
const FruitModel = require("../models/fruitsModel");
const upload = require("../config/multer");
const Authenticate = require("../middleware/authenticate");
const router = express.Router();

// Route to Upload an Image & Save Data
router.post("/createFruit",Authenticate, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const { name, description, price, offerprice, category, rate, offerrate } = req.body;

        const newFruit = new FruitModel({
            name,
            description,
            price,
            offerprice,
            category,
            rate,
            offerrate,
            image: `/uploads/${req.file.filename}` // Store the image path
        });

        await newFruit.save();
        res.status(201).json({ message: "Created Fruit", fruit: newFruit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports.createFruit = async(req,res)=>{
    try {
        const data = req.body;
        const newFruit = await FruitModel(data);
         newFruit.save();
         res.status(200).json({message:"Fruit is uploded successfully",newFruit});
    } catch (error) {
        res.status(500).json({message:"fruit is not uploded"})
    }
};


module.exports.getFruit = async (req,res)=>{
    try {
        const getFruitData = await FruitModel.find();
        res.status(200).json({message:"All fruits data ",getFruitData});
    } catch (error) {
        res.status(500).json({message:"fruits not found",details:error.message});
    }
};

module.exports.updateFruit = async (req,res)=>{
    try {
        const id=req.body.id;
        const query = req.body;
        const updatedFruit = new FruitModel.findByIdAndUpdate(id,query,{
            new:true,
            runValidators:true
        })
        res.status(200).json({message:"Fruit is updated successfully",updatedFruit});
    } catch (error) {
        res.status(500).json({message:"fruits not found",details:error.message});

    }
};

module.exports.deleteFruit = async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedFruit = await FruitModel.findByIdAndDelete(id);
        res.status(200).json({message:"Fruti is deleted",deletedFruit});
    } catch (error) {
        res.status(500).json({message:"Fruit is not deleted",details:error.message})
    }
}
