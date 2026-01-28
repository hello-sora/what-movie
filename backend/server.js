const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OMDB_API_KEY = process.env.OMDB_API_KEY;
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

    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
        if (response.data.Response === 'False') {
            return res.status(404).json({ error: response.data.Error });
        }
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'An error occurred while fetching movie data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});