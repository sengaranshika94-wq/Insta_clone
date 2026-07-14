const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const identifyUser= require('../middlewares/auth.middleware')

const postController = require('../controllers/post.controller')
/**
 * @route POST /api/posts/
 * @desc Create a new post
 * @access Private
 */
postRouter.post('/',upload.single('image'),identifyUser,postController.postCreateController)

/**
 * @route GET /api/posts/
 * @desc Get all posts
 * @access Private
 */
postRouter.get('/',identifyUser,postController.getPostController)

/**
 * @route GET /api/posts/details/:postId
 * @desc Get post details
 * @access Private
 */
postRouter.get('/details/:postId',identifyUser,postController.getPostDetailsController)

/**
 * @route POST /api/posts/like/:postId
 * @desc Like a post
 * @access Private
 */
postRouter.post('/like/:postId',identifyUser,postController.likePostController)

/**
 * @route POST /api/posts/unlike/:postId
 * @desc unLike a post
 * @access Private
 */
postRouter.post('/unlike/:postId',identifyUser,postController.unlikePostController)

/**
 * @route GET /api/posts/feed
 * @description get all the post created in the Db
 * @access Private
 */
postRouter.get("/feed",identifyUser,postController.getFeedPostsController)
module.exports= postRouter