const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername=== followerUsername){
        return res.status(409).json({
            message: "you cannot follow yourself"
        })
    }
    const isFolloweeValid = await userModel.findOne({
        username: followeeUsername
    })
    if(!isFolloweeValid){
        return res.status(404).json({
            message :"there is no such username found"
        })
    }
    const isAlreadyFollowing= await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`you are already following ${followeeUsername}`
        })
    }
    const followRecord= await followModel.create({
        followee:followeeUsername,
        follower:followerUsername
    })
    return res.status(200).json({
        message:`you are following ${followeeUsername}`,
        follow:followRecord
    })

}

async function unfollowUserController(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing= await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if(!isUserFollowing){
        return res.status(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }
    
    await followModel.findByIdAndDelete(isUserFollowing._id)
    return res.status(200).json({
        message:`you unfollowed ${followeeUsername}`
    })

}
module.exports= {
    followUserController,
    unfollowUserController
}