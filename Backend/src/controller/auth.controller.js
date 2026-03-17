const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

    const token = jwt.sign({username, email}, process.env.JWT_SECRET, {expiresIn: "3d"})

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

    const isUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!isUserExist){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({username, email}, process.env.JWT_SECRET, {expiresIn:"3d"})

    res.cookie("user_token", token)

    return res.status(201).json({
        message: "Logged in Successfully",
        user: {
            username,
            email
        }
    })
}


module.exports = {
    registerController,
    loginController
}