const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imageURL:{
        type:String,
        required: [true,"imageURL is required for creating a post"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:[true,'user id is required for creating post']
    }
})

const postModel = mongoose.model('posts',postSchema)

module.exports = postModel