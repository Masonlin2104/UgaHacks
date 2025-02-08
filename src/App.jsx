import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import musicNote from './assets/musicnote.svg'
import './App.css'
import songs from './songs.json'

async function getSongLyrics(name, artist) {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${name}`);
    const data = await response.json();
    return data.lyrics;
  } catch (error) {
    console.error(error);
    return 'Lyrics not found';
  }
}

function App() {
  const [score, setScore] = useState(0);
  const [lyrics, setLyrics] = useState('Lyrics');
  const [fullLyrics, setFullLyrics] = useState(''); // store complete lyrics
  const [genre, setGenre] = useState('Genre');
  const [year, setYear] = useState('Year');
  const [artist, setArtist] = useState('Artist');
  const [songName, setSongName] = useState('');
  const [message, setMessage] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [remainingSongs, setRemainingSongs] = useState([...songs]);

  // New getRandomSong helper which also removes the selected song
  const getRandomSong = () => {
    if (remainingSongs.length === 0) return null;
    const index = Math.floor(Math.random() * remainingSongs.length);
    const selectedSong = remainingSongs[index];
    const updatedRemaining = [...remainingSongs];
    updatedRemaining.splice(index, 1);
    setRemainingSongs(updatedRemaining);
    return selectedSong;
  };

  // Helper function to compute how many lines to show
  const getDisplayedLyrics = (lyrics, incorrectGuesses) => {
    const lines = lyrics.split('\n');
    let numberOfLines = 6; // default is 6 lines
    if (incorrectGuesses >= 3) {
      // for 3 or more incorrect guesses, add one extra line per guess until a maximum of 10 lines
      numberOfLines = Math.min(6 + (incorrectGuesses - 2), 10);
    }
    return lines.slice(0, numberOfLines).join('\n') + '...';
  };

  useEffect(() => {
    startNewRound();
  }, []);

  // Update displayed lyrics when incorrectGuesses changes
  useEffect(() => {
    if (fullLyrics) {
      setLyrics(getDisplayedLyrics(fullLyrics, incorrectGuesses));
    }
  }, [incorrectGuesses]);

  const startNewRound = () => {
    const song = getRandomSong();
    if (!song) {
      setMessage('No more songs available!');
      return;
    }
    setCurrentSong(song);
    const fetchLyrics = async () => {
      let lyrics = await getSongLyrics(song.name, song.artist);
      if (lyrics === 'No lyrics found') { // If lyrics not found, try another song
        const newSong = getRandomSong();
        if (!newSong) {
          setMessage('No more songs available!');
          return;
        }
        setCurrentSong(newSong);
        setGenre(newSong.genre);
        setYear(newSong.year);
        setArtist(newSong.artist);
        lyrics = await getSongLyrics(newSong.name, newSong.artist);
      }
      setFullLyrics(lyrics);
      const displayedLyrics = getDisplayedLyrics(lyrics, incorrectGuesses);
      setLyrics(displayedLyrics);
    };
    fetchLyrics();
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
      setScore(score + 1);
      setTimeout(startNewRound, 3000);
    } else {
      setMessage('❌ Incorrect. Try again.');
      setIncorrectGuesses(incorrectGuesses + 1);
    }

    setSongName('');
  };

  const handleSkip = () => {
    setMessage('⏭️ Skipped! Moving to next song...');
    setTimeout(startNewRound, 1200);
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
        <div style={{ display: 'flex', justifyContent: 'center' , alignItems: 'flex-start' , gap: '50px' }}>
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