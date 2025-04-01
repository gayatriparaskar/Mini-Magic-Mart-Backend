const express =require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT_NO = Number(process.env.PORT_NO);
const connectDB = require("./config/db");
const path = require("path");
const router = require("./routes/fruitRouter");
const vegetableRouter = require("./routes/vegetableRouter");
const userRouter = require("./routes/userRouter");
const dairyRouter = require("./routes/dairyRouter");
var cors = require('cors')

const app = express();
app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    console.log("Welcome to our Project");
    res.send("Hello from server");
    
});

app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.use("/api/fruit",router);
app.use("/uploads", express.static("uploads"));
app.use("/api/vegetable",vegetableRouter);
app.use("/api/users",userRouter);
app.use("/api/dairy",dairyRouter);


app.listen(PORT_NO,()=>{
    console.log(`server is running on ${PORT_NO}`);
    
})