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
const cors = require('cors')

const app = express();

const allowedOrigins = [
    "http://localhost:3001", // for development
    "https://mini-magic-mart-backend.vercel.app" // for production (replace with actual URL)
];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));



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