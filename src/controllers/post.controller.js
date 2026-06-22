const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile}= require('@imagekit/nodejs')

const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function postCreateController(req,res){
    console.log(req.body, req.file)
    const file= await imagekit.files.upload({ //sending file from server to imagekit using these line of code 
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "test"
    })
    res.send(file)
}

module.exports = {
    postCreateController
}