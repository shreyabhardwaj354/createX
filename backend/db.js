const mongoose =  require("mongoose");
const { Schema } = require("zod/v3");

const userSchema = new mongoose.Schema({
    "email" : {
        type : String,
        unique : true
    },
    "password" : String, 
    "firstName" : String,
    "lastName": String
})

const adminSchema = new mongoose.Schema({
    "email" : {
        type : String,
        unique : true
    },
    "password" :String,
    "firstName" : String,
    "lastName" :String,
    "courses" : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "courseModel"
        }
    ]
})

const courseSchema = new mongoose.Schema({
    "title" : String,
    "description" :String,
    "price" : Number,
    "imageUrl" : String,
    "creatorId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'adminModel'
    },
    "level" : String
})

const purchaseSchema = new mongoose.Schema({
    "user" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel"
    },
    "admin" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "adminModel"
    }
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel, 
    courseModel, 
    purchaseModel 
} 