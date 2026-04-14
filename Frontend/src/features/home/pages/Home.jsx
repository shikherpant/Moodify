import EmotionDetector from '../../Expression/components/EmotionDetector'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import './home.scss'

const Home = () => {

  const {handleGetSong} = useSong()

  const songOnMood = (mood) => {
    handleGetSong(mood)
  }

  return (
    <div className="home">
      <div className="home__wrapper">
        <header className="home__header">
          <h1>Feel the mood. Hear the music.</h1>
          <p>Capture your emotion and let Moodify choose the perfect vibe.</p>
        </header>
        <section className="home__detector">
          <EmotionDetector songOnMood={songOnMood} />
        </section>
      </div>
      <Player />
    </div>
  )
}

export default Home