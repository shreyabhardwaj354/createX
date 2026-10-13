const jwt = require('jsonwebtoken');
const {adminModel} = require('../db');


async function auth (req,res,next) {
    try{
        const token = req.cookies.adminToken;
        if(!token){
            return res.status(401)
                    .json({
                        error : "Login first"
                    })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await adminModel.findOne({_id : decoded.id});
        if(!user){
            return res.status(401)
                    .json({
                        error: "User not found!"
                    })
        }
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(500)
                .json({
                    error: err.message
                })
    }
    
}

module.exports = auth