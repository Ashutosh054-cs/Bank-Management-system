const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Server connected to DB");
    })
    .catch(err => {
        console.log(err , "Error connecting DB");
        process.exit(1);
    })
}

module.exports = connectToDB