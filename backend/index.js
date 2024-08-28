const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
  duration: Number
});

const Movie = mongoose.model('Movie', movieSchema);

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Greska pri pribavljanju filmova.' });
  }
});

app.post('/movies', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Greska pri dodavanju filma.' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Greska pri brisanju filma' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
