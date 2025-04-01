const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const Authenticate = async (req,res,next)=>{
    try {
        let token = req.header("Authorization");

        token = token && token.replace("Bearer ","");
    
        if(!token){
            res.status(404).json({message:"Token is not found"});
        }
        console.log(token,ACCESS_TOKEN_SECRET);
        const verifyToken = jwt.verify(token,ACCESS_TOKEN_SECRET);
        
        console.log(verifyToken);

        next();

    } catch (error) {
        res.status(500).json({message:"Token is not verified",details:error.message});
        console.log(error);
        
    } 
}

module.exports = Authenticate ; 
