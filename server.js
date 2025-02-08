const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5173;
const uri = 'mongodb+srv://mag98404:Hackathon10@hackathoncluster.pekpc.mongodb.net/';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.post('/api/songs', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mongodbVSCodePlaygroundDB');
    const collection = database.collection('songs');
    const result = await collection.insertOne(req.body);
    res.status(201).send(result);
  } finally {
    await client.close();
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mongodbVSCodePlaygroundDB');
    const collection = database.collection('songs');
    const songs = await collection.find({}).toArray();
    res.status(200).send(songs);
  } finally {
    await client.close();
  }
});

app.get('/api/songs/artist', async (req, res) => {
  const { name } = req.query;
  try {
    await client.connect();
    const database = client.db('mongodbVSCodePlaygroundDB');
    const collection = database.collection('songs');
    const song = await collection.findOne({ name });
    res.status(200).send({ artist: song ? song.artist : 'Artist not found' });
  } finally {
    await client.close();
  }
});

app.get('/api/songs/random', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mongodbVSCodePlaygroundDB');
    const collection = database.collection('songs');
    const count = await collection.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomSong = await collection.find().limit(1).skip(randomIndex).next();
    res.status(200).send(randomSong);
  } finally {
    await client.close();
  }
});

app.get('/api/songs/songA', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mongodbVSCodePlaygroundDB');
    const collection = database.collection('songs');
    const songA = await collection.findOne({ name: 'Song A' });
    res.status(200).send(songA);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
