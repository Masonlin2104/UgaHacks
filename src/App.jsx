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
  const [score, setScore] = useState(0);
  const [lyrics, setLyrics] = useState('Lyrics');
  const [genre, setGenre] = useState('Genre');
  const [year, setYear] = useState('Year');
  const [artist, setArtist] = useState('Artist');
  const [songName, setSongName] = useState('');
  const [message, setMessage] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const song = getRandomSong();
    setCurrentSong(song);
    setLyrics(song.lyrics);
    setGenre(song.genre);
    setYear(song.year);
    setArtist(song.artist);
    setIncorrectGuesses(0);
    setMessage('');
    setSongName('');
  };

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!songName.trim()) {
      return;
    }
    
    if (currentSong && songName.toLowerCase() === currentSong.name.toLowerCase()) {
      setMessage('🎉 Correct! You guessed the song!');
      setScore(score + 1); // increment score 
      setTimeout(startNewRound, 3000); // wait 3 seconds before starting a new round
    } else {
      setMessage('❌ Incorrect. Try again.');
      setIncorrectGuesses(incorrectGuesses + 1);
    }

    setSongName('');
  };

    const handleSkip = () => {
      setMessage('⏭️ Skipped! Moving to next song...');
      setTimeout(startNewRound, 1200); // wait 1.2 seconds before switching songs
    };

  return (
    <>
      <div>
        <img src={musicNote} className="music-note" alt="music note" style={{ height: 70, width: 70 }}/>
      </div>
      <h2>Songle</h2>
      
      {/* Scorecard */}
      <div className="score-card">
        <h3>Score: {score}</h3>
      </div>
      <div className="lyrics-card">
        <h2>Lyrics:</h2>
        <p>{lyrics}</p>
        <button className="skip-button" onClick={handleSkip}>Skip this song</button>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'flex-start' , gap: '10px' }}>
          <div className="category-card">
            <h2>Genre:</h2>
            <p>{incorrectGuesses >= 1 ? genre : '???'}</p>
          </div>
          <div className="category-card">
            <h2>Year:</h2>
            <p>{incorrectGuesses >= 2 ? year : '???'}</p>
          </div>
          <div className="category-card">
            <h2>Artist:</h2>
            <p>{incorrectGuesses >= 3 ? artist : '???'}</p>
          </div>
        </div>
        
        <form className="input-form" onSubmit={handleSubmit}>
          <label>
            Guess the Song: 
            <input type="text" name="name" value={songName} onChange={handleSongNameChange} />
          </label>
        </form>
      </div>

      <p className="subtitle">
        UGAHacksX - 2025
      </p>
    </>
  );
}

export default App;