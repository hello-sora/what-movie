// Movie vs Movie Game
let vsMovie1, vsMovie2, selectedCard = null;

async function initVersus() {
    document.getElementById('vsResultMessage').innerHTML = '';
    document.getElementById('vsResultMessage').classList.remove('success', 'error');
    
    vsMovie1 = await getRandomMovie();
    vsMovie2 = await getRandomMovie();
    selectedCard = null;

    if (!vsMovie1 || !vsMovie2) {
        document.getElementById('vsResultMessage').textContent = '❌ Failed to load movies. Check your API key or internet connection.';
        document.getElementById('vsResultMessage').classList.add('error');
        document.getElementById('submitVsButton').disabled = true;
        return;
    }

    document.getElementById('vsQuestion').textContent = 'Which movie has a higher IMDb rating?';
    
    document.getElementById('card1-title').innerHTML = `<div class="movie-title">${vsMovie1.Title}</div>`;
    document.getElementById('card1-detail').textContent = `${vsMovie1.Year} • ${vsMovie1.Genre}`;
    document.getElementById('card1-poster').innerHTML = `<img src="${vsMovie1.Poster}" alt="${vsMovie1.Title}" />`;
    
    document.getElementById('card2-title').innerHTML = `<div class="movie-title">${vsMovie2.Title}</div>`;
    document.getElementById('card2-detail').textContent = `${vsMovie2.Year} • ${vsMovie2.Genre}`;
    document.getElementById('card2-poster').innerHTML = `<img src="${vsMovie2.Poster}" alt="${vsMovie2.Title}" />`;

    document.getElementById('card1').classList.remove('selected');
    document.getElementById('card2').classList.remove('selected');
    document.getElementById('submitVsButton').disabled = true;
}

function selectCard(cardNum) {
    selectedCard = cardNum;
    document.getElementById('card1').classList.remove('selected');
    document.getElementById('card2').classList.remove('selected');
    document.getElementById(`card${cardNum}`).classList.add('selected');
    document.getElementById('submitVsButton').disabled = false;
}

function submitVsGuess() {
    if (!selectedCard || !vsMovie1 || !vsMovie2) {
        alert('Movies are still loading or failed to load. Please try again.');
        return;
    }

    const rating1 = parseFloat(vsMovie1.imdbRating) || 0;
    const rating2 = parseFloat(vsMovie2.imdbRating) || 0;
    const higher = rating1 > rating2 ? 1 : rating2 > rating1 ? 2 : 0;
    const resultDiv = document.getElementById('vsResultMessage');

    if (higher === 0) {
        resultDiv.textContent = 'Both movies have the same rating!';
        resultDiv.classList.remove('success', 'error');
        resultDiv.classList.add('success');
    } else if (selectedCard === higher) {
        resultDiv.textContent = `✅ Correct! ${selectedCard === 1 ? vsMovie1.Title : vsMovie2.Title} (${selectedCard === 1 ? rating1 : rating2}) has the higher rating!`;
        resultDiv.classList.remove('error');
        resultDiv.classList.add('success');
    } else {
        resultDiv.textContent = `❌ Wrong! ${higher === 1 ? vsMovie1.Title : vsMovie2.Title} (${higher === 1 ? rating1 : rating2}) has the higher rating!`;
        resultDiv.classList.remove('success');
        resultDiv.classList.add('error');
    }

    document.getElementById('submitVsButton').disabled = true;

    // Auto-load new game after 0.5 seconds
    setTimeout(() => {
        initVersus();
    }, 500);
}
