const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache')

const authUser = async(req, res, next) => {
    const token = req.cookies.user_token

    // using mongodb (less throughput/slower)
    // const isTokenBlacklisted = await blacklistModel.findOne({token})

    // using redis (more throughput/faster)
    const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token Blacklisted"
        })
    }

    let decoded=null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(error){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    req.user = decoded
    next()
}

module.exports = {
    authUser
}