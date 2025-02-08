/* global use, db */
// MongoDB Playground

use('mongodbVSCodePlaygroundDB');

// Insert the new testing songs into the songs collection.
db.getCollection('songs').insertMany([
  {
    'name': 'Bohemian Rhapsody',
    'artist': 'Queen',
    'year': 1975,
    'genre': 'Rock',
    'lyrics': 'Is this the real life? Is this just fantasy?...'
  },
  {
    'name': 'Shape of You',
    'artist': 'Ed Sheeran',
    'year': 2017,
    'genre': 'Pop',
    'lyrics': 'The club isn\'t the best place to find a lover...'
  }
]);

// Run a find command to view all songs.
const allSongs = db.getCollection('songs').find({}).toArray();

// Print a message to the output window.
console.log(allSongs);
