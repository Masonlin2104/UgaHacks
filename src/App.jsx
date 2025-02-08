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

  useEffect(() => {
    const song = getRandomSong();
    setLyrics(song.lyrics);
    setGenre(song.genre);
    setYear(song.year);
    setArtist(song.artist);
  }, [])

  const handleSongNameChange = (e) => {
    setSongName(e.target.value)
    const song = songs.find(song => song.name.toLowerCase() === e.target.value.toLowerCase());
    setArtist(song ? song.artist : 'Artist not found');
  }

  return (
    <>
      <div>
        <img src={musicNote} className="music note" alt="music note" style={{ height: 70, width: 70 }}/>
      </div>
      <h1>LoLdle (Music version hehe)</h1>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h2>Lyrics:</h2>
            <p>{lyrics}</p>
          </div>
          <div>
            <h2>Genre:</h2>
            <p>{genre}</p>
          </div>
          <div>
            <h2>Year:</h2>
            <p>{year}</p>
          </div>
          <div>
            <h2>Artist:</h2>
            <p>{artist}</p>
          </div>
        </div>
        <form>
          <label>
            Guess the Song: 
            <input type="text" name="name" value={songName} onChange={handleSongNameChange} />
          </label>
        </form>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
