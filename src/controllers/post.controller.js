const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile}= require('@imagekit/nodejs')
const jwt= require('jsonwebtoken')
const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function postCreateController(req,res){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not provided, unauthorized access" //only those users can post who are registered or logged in
        })
    }
    let decoded = null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET_KEY) //verifying token using jwt secret key
    }catch(err){
        return res.status(401).json({
            message : "user not authorized"
        })
    }

    console.log(req.body, req.file)
    const file= await imagekit.files.upload({ //sending file from server to imagekit using these line of code 
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "test",
        folder:"cohort-2-insta_clone_posts"
    })
    const post = await postModel.create({
        caption:req.body.caption,
        imageURL:file.url,
        user:decoded.id
    })
    res.status(201).json({
        message:"post created successfully",
        post
    })
}

module.exports = {
    postCreateController
}