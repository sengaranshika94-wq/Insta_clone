const mongoose = require('mongoose')
const likeSchema= new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"a post id must required to like a post "]
    },
    user:{
        type:String,
        required:[true,"a username is must required to like a post"]
    }
},{timestamps:true})
likeSchema.index({post:1,user:1},{unique:true})

const likeModel = mongoose.model('likes',likeSchema)

module.exports=likeModel