const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})

const postController = require('../controllers/post.controller')

postRouter.post('/',upload.single('image'),postController.postCreateController)

postRouter.get('/',postController.getPostController)

postRouter.get('/details/:postId',postController.getPostDetailsController)
module.exports= postRouter