const express = require("express");
const {createDairy ,  getDairy , updateDairy ,deleteDairy} = require("../controllers/dairyController");
const upload = require("../config/multer");
const dairyRouter = express.Router();
const Authenticate = require("../middleware/authenticate");
const DairyModel = require("../models/dairyModel");

// Route to Upload an Image & Save Data
dairyRouter.post("/addDairy",Authenticate, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const { name, description, price, offerprice, category, rate, offerrate } = req.body;

        const newDairy = new DairyModel({
            name,
            description,
            price,
            offerprice,
            category,
            rate,
            offerrate,
            image: `/uploads/${req.file.filename}` // Store the image path
        });

        await newDairy.save();
        res.status(201).json({ message: "Dairy Product is added successfully", dairy: newDairy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

dairyRouter.get("/getDairy",getDairy);
dairyRouter.put("/updateDairy",updateDairy);
dairyRouter.delete("/deleteDairy",deleteDairy);

module.exports = dairyRouter ; 