const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

const registerController = async(req,res) => {

    const {username, email, password} = req.body
    
    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message: "username/email already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        })

    res.cookie("user_token", token)

    return res.status(201).json({
        message: "User Registered Successfully",
        user:{
            username,
            email
        }
    })
}


const loginController = async(req,res) => {

    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {
            id : user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        })

    res.cookie("user_token", token)

    return res.status(201).json({
        message: "Logged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


const getMe = async(req, res) => {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    return res.status(201).json({
        message: "User fetched successfully",
        user
    })
}


const logoutController = async(req, res) => {

    token = req.cookies.user_token
    
    // token blacklisting using mongodb
    // const blacklist_token = blacklistModel.create({token})

    // token blacklisting using redis
    await redis.set(token, Date.now.toString(),"EX", 60*60)

    res.clearCookie("user_token")

    return res.status(200).json({
        message: "User Logged out successfully"
    })
}


module.exports = {
    registerController,
    loginController,
    getMe,
    logoutController
}