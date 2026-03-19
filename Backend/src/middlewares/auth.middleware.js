const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

const authUser = async(req, res, next) => {
    const token = req.cookies.user_token

    const isTokenBlacklisted = await blacklistModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(200).json({
            message: "Token Blacklisted"
        })
    }

    let decoded=null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(error){
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    req.user = decoded
    next()
}

module.exports = {
    authUser
}