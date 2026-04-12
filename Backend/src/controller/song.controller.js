const id3 = require('node-id3')
const storageService = require('../services/storage.service')
const songModel = require('../models/song.model')

const uploadSong = async(req, res) => {

    const songBuffer = req.file.buffer
    const {mood} = req.body
    const tags = id3.read(songBuffer)
    
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/poster"
        })
    ]) 

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood: mood
    })

    return res.status(201).json({
        message: "Song created successfully",
        song: song
    })
}

const getSong = async(req, res) => {
    const {mood} = req.query

    const songs = await songModel.findOne({
        mood:mood
    })

    return res.status(200).json({
        message: "Songs fetched successfully",
        songs: songs
    })
}

module.exports = {uploadSong, getSong}