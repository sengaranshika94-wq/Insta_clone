const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
    const hash = await bcrypt.hash(password, 10)
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
    
    const isPasswordMatch = await bcrypt.compare(password , user.password)
    if(!isPasswordMatch){
        return res.status(401).json({
            message : "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
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

async function getmePostController(req,res) {
    const userId = req.user.id
    const user = await userModel.findById(userId)
     if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    return res.status(200).json({
        message:"information fetched successfully",
       user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profile_image:user.profile_image
       }
    })
}

module.exports= {
    registerController,
    loginController,
    getmePostController
}