const express= require("express")
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
const identifyUser = require("../middlewares/auth.middleware")

userRouter.post('/follow/:username',identifyUser,userController.followUserController)
userRouter.post('/unfollow/:username',identifyUser,userController.unfollowUserController)
userRouter.post('/follow/accept/:id',identifyUser,userController.acceptFollowRequestController)
userRouter.post('/follow/reject/:id',identifyUser,userController.rejectFollowRequestController)

module.exports= userRouter