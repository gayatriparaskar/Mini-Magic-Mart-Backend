const express = require("express");
const router = express.Router();
const { getFruit , updateFruit , deleteFruit } =require ("../controllers/fruitController");
const Authenticate = require("../middleware/authenticate");

// Route to Serve Uploaded Images

router.get("/getFruits",Authenticate,getFruit);
router.put("/updateFruit/:id",Authenticate,updateFruit);
router.delete("/deleteFruit",Authenticate,deleteFruit);

module.exports = router;
