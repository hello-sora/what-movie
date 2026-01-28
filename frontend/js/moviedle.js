// Moviedle Game
let currentMovie = null;
let moviedleClues = null;
let guessCount = 0;

async function initMoviedle() {
    guessCount = 0;
    currentMovie = await getRandomMovie();
    moviedleClues = [
        { label: 'Year', value: currentMovie.Year },
        { label: 'Rated', value: currentMovie.Rated },
        { label: 'Genre', value: currentMovie.Genre },
        { label: 'Director', value: currentMovie.Director }
    ];
    displayMoviedleClues();
}

function displayMoviedleClues() {
    const container = document.getElementById('cluesContainer');
    const revealedCount = Math.min(guessCount + 1, moviedleClues.length);
    let html = '<strong>Revealed Clues:</strong>';
    
    for (let i = 0; i < revealedCount; i++) {
        html += `
            <div class="clue">
                <div class="clue-label">${moviedleClues[i].label}</div>
                <div class="clue-value">${moviedleClues[i].value}</div>
            </div>
        `;
    }
    
    if (revealedCount < moviedleClues.length) {
        html += `<p style="margin-top: 10px; color: #666;">Make a guess to reveal more clues!</p>`;
    }
    
    container.innerHTML = html;
}

function submitGuess() {
    const guess = document.getElementById('guessInput').value.trim().toLowerCase();
    const correctMovie = currentMovie.Title.toLowerCase();
    const resultDiv = document.getElementById('resultMessage');

    if (!guess) {
        resultDiv.textContent = 'Please enter a guess!';
        resultDiv.classList.remove('success', 'error');
        resultDiv.classList.add('error');
        return;
    }

    if (guess === correctMovie) {
        resultDiv.textContent = `🎉 Correct! The movie was ${currentMovie.Title}!`;
        resultDiv.classList.remove('error');
        resultDiv.classList.add('success');
        document.getElementById('guessInput').disabled = true;
        document.querySelector('#moviedleGame .guess-button').disabled = true;
    } else {
        guessCount++;
        if (guessCount >= moviedleClues.length - 1) {
            resultDiv.textContent = `❌ Wrong! The movie was ${currentMovie.Title}. Better luck next time!`;
            resultDiv.classList.remove('success');
            resultDiv.classList.add('error');
            document.getElementById('guessInput').disabled = true;
            document.querySelector('#moviedleGame .guess-button').disabled = true;
        } else {
            resultDiv.textContent = '❌ Wrong guess! Try again with the new clues.';
            resultDiv.classList.remove('success');
            resultDiv.classList.add('error');
            displayMoviedleClues();
        }
    }
    document.getElementById('guessInput').value = '';
}
