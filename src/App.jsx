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
            <input type="text" name="name" />
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
