const mongoose  = require("mongoose");

require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("DB Connected!")})
    .catch((error)=>{
        console.log("DB CONNECTION ISSUES");
        console.error(error);
        process.exit(1);
    }); 

}
