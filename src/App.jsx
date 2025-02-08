import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import musicNote from './assets/musicnote.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [lyrics, setLyrics] = useState('Lyrics')
  const [genre, setGenre] = useState('Genre')
  const [year, setYear] = useState('Year')
  const [artist, setArtist] = useState('Artist')

  return (
    <>
      <div>
        <img src={musicNote} className="music note" alt="music note" style={{ height: 70, width: 70 }}/>
      </div>
      <h2>Songle</h2>
      <div className="card">
      <div class="lyrics-card">
            <h2>Lyrics:</h2>
            <p>{lyrics}</p>
          </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div class="category-card">
            <h2>Genre:</h2>
            <p>{genre}</p>
          </div>
          <div class="category-card">
            <h2>Year:</h2>
            <p>{year}</p>
          </div>
          <div class="category-card">
            <h2>Artist:</h2>
            <p>{artist}</p>
          </div>
        </div>
        <form class="input-form">
          <label>
            Guess the Song: 
            <input type="text" name="name" />
          </label>
        </form>
      </div>
      <p className="subtitle">
        UGAHacksX - 2025
      </p>
    </>
  )
}

export default App
