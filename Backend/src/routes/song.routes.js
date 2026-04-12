const express = require('express')
const upload = require('../middlewares/upload.middleware')
const songController = require('../controller/song.controller')

const songRouter = express.Router()

songRouter.post("/", upload.single("song"), songController.uploadSong)
songRouter.get("/get-song", songController.getSong)

module.exports = songRouter