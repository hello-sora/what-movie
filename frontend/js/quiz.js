// Quiz Game
const quizQuestions = [
    {
        question: 'What genre do you prefer?',
        options: ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi'],
        key: 'genre'
    },
    {
        question: 'What era appeals to you?',
        options: ['2020s', '2010s', '2000s', '1990s and earlier'],
        key: 'era'
    },
    {
        question: 'What mood are you in?',
        options: ['Exciting', 'Thought-provoking', 'Light-hearted', 'Intense'],
        key: 'mood'
    }
];

let quizAnswers = {};
let currentQuestion = 0;

async function initQuiz() {
    quizAnswers = {};
    currentQuestion = 0;
    displayQuizQuestion();
}

function displayQuizQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        getQuizRecommendation();
        return;
    }

    const q = quizQuestions[currentQuestion];
    const container = document.getElementById('quizContainer');
    
    container.innerHTML = `
        <div class="quiz-question active">
            <div class="question-text">${q.question}</div>
            <div class="options">
                ${q.options.map((opt, idx) => `
                    <button class="option-button" onclick="selectOption('${q.key}', '${opt}', ${idx})">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectOption(key, value, idx) {
    quizAnswers[key] = value;
    document.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    setTimeout(() => {
        currentQuestion++;
        displayQuizQuestion();
    }, 300);
}

async function getQuizRecommendation() {
    const movie = await getRandomMovie();
    
    document.getElementById('quizContainer').innerHTML = '';
    document.getElementById('recommendationResult').classList.add('active');
    
    document.getElementById('recTitle').textContent = movie.Title;
    document.getElementById('recDetails').textContent = `${movie.Year} • ${movie.Genre} • Rating: ${movie.imdbRating}`;
    
    if (movie.Poster && movie.Poster !== 'N/A') {
        document.getElementById('recPoster').innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}" />`;
    }
}
