const express = require("express");
const { createUser , loginAdmin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/createUser",createUser);
userRouter.post("/adminLogin",loginAdmin);

module.exports = userRouter ; 