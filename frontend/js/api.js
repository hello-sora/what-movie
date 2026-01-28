// API Helper - handles all API calls
async function getRandomMovie() {
    const titles = ['The Shawshank Redemption', 'The Godfather', 'Inception', 'Interstellar', 'Pulp Fiction', 'The Matrix', 'Forrest Gump', 'Titanic', 'Avatar', 'The Dark Knight', 'The Avengers', 'Joker', 'Parasite', 'Oppenheimer', 'Barbie'];
    const title = titles[Math.floor(Math.random() * titles.length)];
    
    try {
        const response = await fetch(`/api/movies?title=${encodeURIComponent(title)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie');
        }
        const data = await response.json();
        console.log('Fetched movie:', data.Title, 'Rating:', data.imdbRating);
        return data;
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
    }
}
