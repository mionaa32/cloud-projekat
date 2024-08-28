import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/cinema.png';


function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Greska u pribavljanju filmova!', error);
      });
  }, []);

  const addMovie = () => {
    if (!title.trim() || !director.trim() || !year.trim() || !duration.trim()) {
      setError('Sva polja moraju biti popunjena.');
      return;
    }

    axios.post('http://localhost:3000/movies', { title, director, year, duration })
      .then(response => {
        setMovies([...movies, response.data]);
        setTitle('');
        setDirector('');
        setYear('');
        setDuration('');
        setError('');
      })
      .catch(error => {
        console.error('Greska u dodavanju filma!', error);
      });
  };

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:3000/movies/${id}`)
      .then(() => {
        setMovies(movies.filter(movie => movie._id !== id));
      })
      .catch(error => {
        console.error('Greska u brisanju filma!', error);
      });
  };

  return (
    <div className='page'>
    <div className="all">
      <h1 className='naslov'>Filmovi za gledanje</h1>
      <div className='divider-bold'></div>
      <div className='add'>
        <h2 className='naslov'>Unesite film</h2>
        <label htmlFor="title" className='label'>Naziv filma:</label>
        <input
          type="text"
          label
          placeholder="Naziv filma"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title" className='label'>Režiser:</label>
        <input
          type="text"
          placeholder="Ime"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <label htmlFor="title" className='label'>Godina:</label>
        <input
          type="text"
          placeholder="2000"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label htmlFor="title" className='label'>Trajanje:</label>
        <input
          type="text"
          placeholder="60 (u minutima)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button onClick={addMovie}>dodaj film</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className='divider-bold'></div>
      <h2 className='naslov'>Vaša lista</h2>
      <ul className='myMovies'>
        {movies.map((movie) => (
          <li key={movie._id}>
            <div className='movie'><img src={logo} alt='Film - ' className='icon'/>{movie.title} ({movie.year}) | {movie.director}  | {movie.duration} minuta</div>
            <button onClick={() => deleteMovie(movie._id)}>ukloni</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
