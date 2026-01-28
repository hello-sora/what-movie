// Main Navigation Logic
let currentGame = null;

function startGame(game) {
    currentGame = game;
    document.getElementById('homeScreen').classList.add('hidden');
    document.querySelector('.back-button').style.display = 'block';

    // Hide all game screens
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    if (game === 'moviedle') {
        document.getElementById('moviedleGame').classList.add('active');
        initMoviedle();
    } else if (game === 'versus') {
        document.getElementById('versusGame').classList.add('active');
        initVersus();
    } else if (game === 'quiz') {
        document.getElementById('quizGame').classList.add('active');
        initQuiz();
    }
}

function goHome() {
    currentGame = null;
    document.getElementById('homeScreen').classList.remove('hidden');
    document.querySelector('.back-button').style.display = 'none';
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
}
