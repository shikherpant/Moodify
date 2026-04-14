import { useContext } from "react";
import { getSong } from "../service/song.api";
import { SongContext } from "../context/song.context";

export const useSong = () => {

    const {loading, setLoading, song, setSong} = useContext(SongContext)
    
    const handleGetSong = async(mood) => {
        setLoading(true)
        const data = await getSong(mood)
        console.log(data)
        setSong(data.songs)
        setLoading(false)
    }

    return ({loading, song, handleGetSong})
}