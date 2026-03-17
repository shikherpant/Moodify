require('dotenv').config()
const mongoose = require("mongoose")

const connectToDb = async() => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch(err => {
        console.log("Connect To Database Error", err)
    })
}

module.exports = connectToDb