const postModel = require('../models/post.model')
const likeModel=require('../models/like.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile}= require('@imagekit/nodejs')
const jwt= require('jsonwebtoken')
const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function postCreateController(req,res){
    
    console.log(req.body, req.file)
    const file= await imagekit.files.upload({ //sending file from server to imagekit using these line of code 
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "test",
        folder:"cohort-2-insta_clone_posts"
    })
    const post = await postModel.create({
        caption:req.body.caption,
        imageURL:file.url,
        user:req.user.id
    })
    res.status(201).json({
        message:"post created successfully",
        post
    })
}

async function getPostController(req,res){
    
    const userId = req.user.id

    const posts= await postModel.find({
        user:userId
    })

    res.status(200).json({
        message: "post fetched successfully",
        posts
    })
     
}

async function getPostDetailsController(req,res){


    const userId= req.user.id
    const postId = req.params.postId
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }
    const isUserValid= post.user.toString() === userId
    if(!isUserValid){
        return res.status(403).json({
            message: "content is forbidden"
        })
    }
    return res.status(200).json({
        message: "post fetched successfully",
        post
    })
}

async function likePostController(req,res) {
    const postId = req.params.postId
    const user=req.user.username
    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const like= await likeModel.create({
        user:user,
        post:postId
    })
    res.status(200).json({
        message:"post liked successfully"
    })
}

async function unlikePostController(req,res){
    const postId = req.params.postId
    const username = req.user.username
    const isPostLiked = await likeModel.findOne({
        post:postId,
        user:username
    })
     if(!isPostLiked){
        return res.status(400).json({
            message : "post didn't liked"
        })
     }
    await likeModel.findOneAndDelete({_id: isPostLiked._id})
    return res.status(200).json({
        message: "post unLiked successfully"
    })
}

async function getFeedPostsController(req,res){
    const user = req.user
    const posts = await Promise.all((await postModel.find().sort({_id : -1}).populate('user').lean())
    .map(async (post) => {
        const isLiked = await likeModel.findOne({
            user : user.username,
            post : post._id
        })
        post.isLiked = Boolean(isLiked)
        
        return post
    })) //will find all the posts in the Database with the user details above and will check if the user has liked the post or not and will return the post with the isLiked property
    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })

}
module.exports = {
    postCreateController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unlikePostController,
    getFeedPostsController
}