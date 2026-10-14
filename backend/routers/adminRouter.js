const express = require('express');
const router = express.Router();
const {adminModel} = require("../db");
const adminAuth = require("../middlewares/adminAuth");
const {courseModel} = require("../db");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await adminModel.findOne({email})
        if(!user){
            return res.status(401)
                .json({
                    error: "Email or password is wrong!"
                })
        }
        const isCorrectPass = await bcrypt.compare(password, user.password);
        if(!isCorrectPass){
            return res.status(401)
                .json({
                    error: "Email or password is wrong!"
                })
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.cookie("adminToken", token );

        return res.status(200)
                .json({
                    token: token,
                    message : "Succesfully Logged in!"
                })

    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

router.post("/signup", async (req,res)=>{
    try{
        const {email, password, firstName, lastName} = req.body;
        const adminSchema = z.object({
            email : z.string().email("Enter valid email"),
            password: z.string().min(8).max(30)
                .regex(/[a-z]/, "Password must have lower case character")
                .regex(/[A-Z]/,"Password must have upper case character")
                .regex(/[^a-zA-Z0-9]/,"Password must have special character"),
            firstName: z.string(),
            lastName: z.string()
        })
        const verify = adminSchema.safeParse({
            email, password, firstName, lastName
        })
        if(!verify.success){
            return res.status(400)
                .json({
                    error : "Input Validation failed",
                    fieldErrors: verify.error.flatten().fieldErrors
                })
        }
        const user = await adminModel.findOne({email});
        if(user){
            return res.status(409)
                        .json({
                            error : "Something went wrong !Try new user"
                        })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await adminModel.create({
            email, 
            password : hash,
            firstName,
            lastName
        })

        return res.status(200)
                    .json({
                        message: "Signup Success"
                    })

    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

router.use(adminAuth);

router.post("/createCourse",async (req,res)=>{
    try{
        const {title, description, price, imageUrl, level} = req.body;
        const CourseSchema = z.object({
            title : z.string().min(8),
            description : z.string().max(150, "Maximum description length is 150"),
            level: z.string(),
            price: z.coerce.number()
                        .finite("Price must be a valid number")
                        .min(0, "Price cannot be negative"),
        })
        const validate = CourseSchema.safeParse({
            title,
            description,
            level,
            price
        })
        if(!validate.success){
            return res.status(400)
                        .json({
                            error : "Validation error",
                            fieldErrors : validate.error.flatten().fieldErrors
                        })
        }

        const newCourse = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId : req.user._id,
            level
        })

        const user = await adminModel.findById(req.user._id);
        user.courses.push(newCourse._id);
        await user.save();

        return res.status(200)
                    .json({
                        message : "Sucessfuly Course created"
                    })

    }catch(err){
        res.status(500)
            .json({
                error : err.message
            })
    }
})

router.get("/me", (req,res)=>{
    res.set("Cache-Control", "no-store");
    return res.status(200)
            .json({
                authenticated: true,
            })
})


router.get("/dashboard",async (req,res)=>{
    try{
        const user = await adminModel.findOne({_id :req.user._id}).populate('courses');
        return res.status(200)
                .json({
                    message : "Sucess",
                    courses : user.courses
                })
    }
    catch(err){
       console.log(err)
       return  res.status(500)
                .json({
                    error : err.message
                })
    }
})

router.get("/course/:id", async (req,res)=>{
    try{
        const courseId = req.params.id;
        const course = await courseModel.findById(courseId);
        if(!course){
            return res.status(404)
                        .json({
                            error : "Course does not exist"
                        })
        }
        return res.status(200)
                    .json({
                        message : "Sucess",
                        course
                    })
    }catch(err){
        return res.status(500)
                .json({
                    error : err.message
                })
    }
})


router.post("/edit/:courseId", async (req,res)=>{
    try{
        const courseId = req.params.courseId;
        const {title, description, imageUrl, price} = req.body;
        const updatedCourse = await courseModel.findOneAndUpdate({_id: courseId}, {
            title,
            description,
            imageUrl,
            price
        })
        if(!updatedCourse){
            return res.status(404)
                        .json({
                            error : "Course not found"
                        })
        }
        return res.status(200)
                    .json({
                        message : "Course updated sucessfully",
                        course : updatedCourse
                    })
    }catch(err){
        return res.status(500)
                    .json({
                        error: err.message
                    })
    }
})

router.post("/logout",(req,res)=>{
    try{
        const token = req.cookies.token;
        res.clearCookie("adminToken");
        return res.status(200)
                .json({
                    message : "Logged out Sucessfully"
                })
    }catch(err){
        return res.status(500)
                    .json({
                        error: err.message
                    })
    }
})

module.exports = router;