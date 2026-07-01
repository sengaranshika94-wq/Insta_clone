const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "username already exist try with new one"],
        required : [true,"username is required"]
    },
    email:{
        type : String,
        unique: [true, "email already exist try with new one"],
        required : [true, "email is required"]
    },
    password : {
        type:String,
        required: [true, "password is required"],
        select: false
    },
    bio: String,
    profile_image: {
        type :String,
        default : "https://ik.imagekit.io/mxctzcs8x/default.webp?updatedAt=1782123535526"
    }
})
const userModel =  mongoose.model('users',userSchema)

module.exports = userModel