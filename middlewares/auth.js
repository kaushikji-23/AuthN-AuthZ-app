// auth, isAdmin, isStudent

const jwt  = require("jsonwebtoken");
require("dotenv").config();

// auth middleware  - 
exports.auth = (req, res, next) =>{
    try{
        // PENDNG: ways to extract token - 
        // extract token - 
            const token = req.body.token ;

            if(!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token is missing",
                });
            };
        // verify the token  - 
            try{
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                console.log(payload);
                //store with user  
                req.user = payload;
            }  catch(error){
                return res.json({
                    success: false,
                    message: "token is invalid",
                }); 
            };
                next(); 0  
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "something went wrong!, while verifing the token",
        });
    };
};

// student middleware  - 
    exports.isStudent  = (req, res, next)=> {
        try{
            if(req.user.role !== "Student"){
                return res.status(401).json({
                    success: false,
                    message: "This is a protected route for students",
                });
            }
            next();
        } catch(error){
            return res.status(401).json({
                success: false,
                message: "user role is not matching",
            });
        };
    };

// Admin middleware  - 
    exports.isAdmin  = (req, res, next) =>{
        try{
            if(req.user.role !== "Admin"){
                return res.status(401).json({
                    success: false,
                    message: "This route is protected for admin",
                });
            };
                next();
        }catch(error){
            return res.status(401).json({
                success: false,
                message: "user role is not matching",
            });
        };
    };