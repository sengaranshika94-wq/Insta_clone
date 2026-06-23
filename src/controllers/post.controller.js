const postModel = require('../models/post.model')
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

module.exports = {
    postCreateController,
    getPostController,
    getPostDetailsController
}