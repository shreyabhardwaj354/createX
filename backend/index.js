require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const connectDB = require('./connect');
const cookieParser = require("cookie-parser");
const cors = require('cors');


connectDB();

app.use(cors( {
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


app.use('/user', userRouter);

app.use('/admin', adminRouter);

app.listen(3000);