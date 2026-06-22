const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

async function registerController (req,res){
    const {email,username,password,bio,profile_image}= req.body
    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message : "user already exist with"+(isUserAlreadyExist.email === email ? "this email" : "this username")
        })
    }
    const hash =crypto.createHash("md5").update(password).digest("hex")
    const user =await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profile_image
    
    })
    const token= jwt.sign({
        id: user._id,
        username:user.username
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1d"}
    )
    res.cookie("token",token)
    return res.status(201).json({
        message: "user is created",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image : user.profile_image
        }  ,
        token
    })
    

}

async function loginController (req,res){
    const {username,password,email}= req.body
    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
   if(!user){
    return res.status(404).json({
        message: "user not found"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const isPasswordMatch = hash === user.password
    if(!isPasswordMatch){
        return res.status(401).json({
            message : "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1d"}
    )
    res.cookie("token",token)
     return res.status(200).json({
        message:"user logged in successfully",
        token,
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio
        }
    })
}

module.exports= {
    registerController,
    loginController
}