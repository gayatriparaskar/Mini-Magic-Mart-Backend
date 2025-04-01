const express = require("express");
const VegetableModel = require("../models/vegetablesModel");
const upload = require("../config/multer");
const vegetableRouter = express.Router();
const { getVegetable , updateVegetable ,deleteVegetable } =require ("../controllers/vegetableController");
const Authenticate = require("../middleware/authenticate");

// Route to Upload an Image & Save Data
vegetableRouter.post("/createVegetable",Authenticate, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const { name, description, price, offerprice, category, rate, offerrate } = req.body;

        const newVegetable = new VegetableModel({
            name,
            description,
            price,
            offerprice,
            category,
            rate,
            offerrate,
            image: `/uploads/${req.file.filename}` // Store the image path
        });

        await newVegetable.save();
        res.status(201).json({ message: "Fruit added successfully", vegetable: newVegetable });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to Serve Uploaded Images

vegetableRouter.get("/getFruits",getVegetable);
vegetableRouter.put("/updateFruit/:id",updateVegetable);
vegetableRouter.delete("/deleteVegetable",deleteVegetable);

module.exports = vegetableRouter;
