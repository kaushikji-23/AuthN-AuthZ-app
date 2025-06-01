const  bcrypt = require("bcrypt");
//importing models to interact with db :- 
const User = require("../models/User");
const jwt = require("jsonwebtoken"); 
require("dotenv").config();

// signup route handler - 
exports.signup = async (req, res) => {
  try {  // get data :- 
            const { name, email, password, role } = req.body;  
            console.log("Received body:", req.body); // ✅ Debug log
        // Input Validation :- 
                if (!name || !email || !password || !role) {
                    return res.status(400).json({
                        success: false,
                        message: "All fields are required",
                    });
                }; 
        // Check if user already exist :- 
            const existingUser = await User.findOne({ email });
            if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
            }
        // Secure Password :-
            let hashedPassword;
                try{
                    hashedPassword = await bcrypt.hash(password, 10);
                }
                catch (error){
                    return res.status(500).json({
                        success: false,
                        message: "Error in hashing password"
                    });
                };
        // Create entry for user :- 
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
            });

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                user,
            });
  } 
  catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
        success: false,
        message: "User cannot be registered, please try again later",
        });
    };
};



// login :- 
    exports.login = async (req, res)=>{
        try{
            // data fetch 
                const {email, password} = req.body;
            // validation on email & password :- 
                if(!email || !password){
                    return res.status(400).json({
                        success: false,
                        message: "Please fill the details carefully",
                    }); 
                }
            // check for registered user :- 
                let user = await User.findOne({email});
            // if not registered user :- 
                if(!user){
                    return res.status(401).json({
                        success: false,
                        message: "User is not regitered",
                    });
                }
            // making payload :- 
                const payload = {
                    email: user.email,
                    id: user._id,
                    role: user.role,
                };
            // verify password & generate jwt token :- 
                if(await bcrypt.compare(password, user.password) ){
                    // password match 
                        let token = jwt.sign(payload, process.env.JWT_SECRET,
                                                                    {
                                                                        expiresIn:"2h",
                                                                    }); 
                    // sending token in user body:- 
                        user = user.toObject();
                        user.token = token;
                        user.password = undefined; 
                    
                    // creating cookies :- 
                        // options one of the parameter of cookie:-
                          const options = {
                            expires:new Date(Date.now()+ 3*24*60*60*1000),
                            httpOnly: true,
                          };
                    // creating cookie :- 
                        res.cookie("SecCookie", token, options).status(200).json({
                            success: true,
                            user,
                            token,
                            message: "User logged in successfully",
                        }); 
                }
                else{
                    // password do not match 
                        return res.status(403).json({
                            success: false,
                            message: "Password Incorrect",
                        });
                }
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Login Failure",
            });
        };
    };