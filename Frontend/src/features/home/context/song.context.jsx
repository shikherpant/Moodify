import { useState, createContext } from "react"

export const SongContext = createContext()

const SongContextProvider = ({children}) => {

    const [song,setSong] = useState({
            "url": "https://ik.imagekit.io/m7zopczvz/cohort-2/moodify/songs/ARMY__GANGWAR_2__320Kbps-_Mr-Jat.in__Au0PYYzBG.mp3",
            "posterUrl": "https://ik.imagekit.io/m7zopczvz/cohort-2/moodify/poster/ARMY__GANGWAR_2__320Kbps-_Mr-Jat.in__xnmkCiapO.jpeg",
            "title": "ARMY (GANGWAR 2)_320Kbps-(Mr-Jat.in)",
            "mood": "surprised",
        })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{song, setSong, loading, setLoading}}>
            {children}
        </SongContext.Provider>
    )
}

export default SongContextProvider