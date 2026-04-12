const express = require('express')
const cookie = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const cors = require('cors')
const songRouter = require('./routes/song.routes')
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookie())
app.use("/api/auth",authRouter)
app.use("/api/songs",songRouter)


app.get("/",(req,res)=>{
    res.send("Hello")
})

module.exports = app