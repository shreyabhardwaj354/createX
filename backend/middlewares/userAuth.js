const {userModel} = require("../db");
const jwt = require("jsonwebtoken");


async function auth(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401)
                        .json({
                            error: "Login first!"
                        })
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        const user = await userModel.findOne({_id : decoded.user_id});
        req.user = user;
        console.log("Auth done" + req.user);
        next();
    }catch(e){
        res.send("ERROR " + e.message);
    }
}

module.exports = auth;