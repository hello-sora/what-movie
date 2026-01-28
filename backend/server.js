const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

// Default route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Route to fetch movie details
app.get('/api/movies', async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Movie title is required' });
    }

    console.log(`Fetching movie: ${title}`);

    try {
        // First, search for the movie
        const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`);
        
        if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Get the first result
        const movie = searchResponse.data.results[0];
        const movieId = movie.id;

        // Get detailed info for the movie
        const detailResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        const movieData = detailResponse.data;

        console.log(`Successfully fetched: ${movieData.title}`);

        // Transform TMDB response to match our frontend expectations
        res.json({
            Title: movieData.title,
            Year: movieData.release_date ? movieData.release_date.split('-')[0] : 'N/A',
            Rated: movieData.adult ? 'R' : 'PG-13',
            Genre: movieData.genres.map(g => g.name).join(', ') || 'N/A',
            Director: 'N/A', // TMDB doesn't include director in the main endpoint
            imdbRating: movieData.vote_average || 0,
            Plot: movieData.overview || 'N/A',
            Poster: movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : 'N/A'
        });
    } catch (error) {
        console.error('Error fetching movie data:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching movie data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});