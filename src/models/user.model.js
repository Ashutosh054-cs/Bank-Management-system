const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for Creating user"],
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email Address"],
        unique:[true,"Email already exists"]
    }
    Username:{
        type:String,
        required:[true,"Name is required for creating user account"],
    }
    Userpassword:{
        type:String,
        required:[true,"Password is required for creating account"],
        minlength:[8, "Password should contain more than 8 character"],
        select: false
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(!this.isModified(Userpassword)){
        return next()
    }
    const hash = await bcrypt.hash(this.Userpassword, 10)
    this.Userpassword = hash
    return next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.Userpassword)
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel