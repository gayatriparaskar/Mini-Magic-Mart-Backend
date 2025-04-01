const express = require("express");
const { createUser , loginAdmin , getAllUsers } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/createUser",createUser);
userRouter.post("/adminLogin",loginAdmin);
userRouter.get("/getUsers",getAllUsers);

module.exports = userRouter ; 