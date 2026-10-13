const express = require('express');
const router = express.Router();
const userAuth = require("../middlewares/userAuth");
const z = require('zod');
const {userModel} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


router.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(500).json({
               error : "Something went wrong !"
            });
        }
        const compare = await bcrypt.compare(password, user.password);
        if(!compare){
            return res.status(500).json({
               error : "Something went wrong !"
            });
        }

        const token = jwt.sign(
            {user_id: user._id}, 
            process.env.JWT_SECRET
        );

        res.cookie("token", token);

        return res.status(200).json({
               message : "Login Sucessfull !"
        });
    }catch(e){
        res.status(401).json({
            error : e.message
        });
    }
})

router.post("/signup", async (req,res)=>{
    try{
        const {email, password, firstName, lastName} = req.body;
        const userSchema = z.object({
            email : z.string().email(),
            password : z.string().min(8, "Should be 8 characters long")
            .max(32, "Password cannot exceed 32 characters")
            .regex(/[A-Z]/, "Password must contain one Upper case letter")
            .regex(/[a-z]/, "Password must contain one Lower case letter")
            .regex(/[^a-zA-Z0-9]/, "Password must contain one special character"),
            firstName : z.string(),
            lastName : z.string()
        })
        const result = userSchema.safeParse({
            email,
            password,
            firstName,
            lastName
        });
        if(!result.success){
            console.log("Validation failed");
            return res.status(400).json({
                error : "Validation Error",
                fieldErrors: result.error.flatten().fieldErrors
            });
        }
        else{
            console.log("Sucess validation");

        }

        // check in database if new user or not
        const find = await userModel.findOne({email});
        if(find){
            return res.status(409).json({
                error : "User already exists. Login!"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            email, password : hash, firstName, lastName
        });
        return res.status(200).json({
            message : "Signup succesfull ! Login!"
        });
    }catch(e){
        return res.status(500).json({
            error : e.message
        });
    }
})

router.use(userAuth);

router.post("/purchaseCourse", (req,res)=>{
    res.send("Hello!");
})

router.get("/Courses", (req,res)=>{
    
    res.send("Hello!");
})

router.get("/purchased/Courses", (req,res)=>{

})

module.exports = router;