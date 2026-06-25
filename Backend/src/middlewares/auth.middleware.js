const jwt = require('jsonwebtoken')
async function identifyUser(req,res,next){
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"unauthorized access"
            
            })
        }
        let decoded
        try{
            decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY)
        }catch(err){
            return res.status(401).json({
                message: "unauthorized access"
            })
        }
        req.user = decoded //new property added 
        next()
}
module.exports= identifyUser