import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import musicNote from './assets/musicnote.svg'
import './App.css'
import songs from './songs.json'

const getRandomSong = () => {
  return songs[Math.floor(Math.random() * songs.length)];
};

function App() {
  const [count, setCount] = useState(0)
  const [lyrics, setLyrics] = useState('Lyrics')
  const [genre, setGenre] = useState('Genre')
  const [year, setYear] = useState('Year')
  const [artist, setArtist] = useState('Artist')
  const [songName, setSongName] = useState('')
  const [message, setMessage] = useState('')
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    const song = getRandomSong();
    setCurrentSong(song);
    setLyrics(song.lyrics);
    setGenre(song.genre);
    setYear(song.year);
    setArtist(song.artist);
  }, [])

  const handleSongNameChange = (e) => {
    setSongName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSong && songName.toLowerCase() === currentSong.name.toLowerCase()) {
      setMessage('Congratulations! You guessed the song correctly.');
    } else {
      setMessage('Incorrect. Try again.');
    }
  }

  return (
    <>
      <div>
        <img src={musicNote} className="music note" alt="music note" style={{ height: 70, width: 70 }}/>
      </div>
      <h2>Songle</h2>
      <div className="card">
        <div className="lyrics-card">
          <h2>Lyrics:</h2>
          <p>{lyrics}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="category-card">
            <h2>Genre:</h2>
            <p>{genre}</p>
          </div>
          <div className="category-card">
            <h2>Year:</h2>
            <p>{year}</p>
          </div>
          <div className="category-card">
            <h2>Artist:</h2>
            <p>{artist}</p>
          </div>
        </div>
        <form className="input-form" onSubmit={handleSubmit}>
          <label>
            Guess the Song: 
            <input type="text" name="name" value={songName} onChange={handleSongNameChange} />
          </label>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
      <p className="subtitle">
        UGAHacksX - 2025
      </p>
    </>
  )
}

export default App
