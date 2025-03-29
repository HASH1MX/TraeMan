// Word categories and words for the game
const wordCategories = {
    'PROGRAMMING': [
        'JAVASCRIPT', 'PYTHON', 'DEVELOPER', 'PROGRAMMING', 'COMPUTER',
        'ALGORITHM', 'FUNCTION', 'VARIABLE', 'KEYBOARD', 'MONITOR',
        'DOMAIN', 'SYSTEM', 'CONTROL', 'ACCESS', 'MEDIA'
    ],
    'WEB': [
        'BROWSER', 'INTERNET', 'NETWORK', 'DATABASE', 'SERVER',
        'WEBSITE', 'APPLICATION', 'INTERFACE', 'FRAMEWORK', 'LIBRARY',
        'SUBMIT', 'ACHIEVE', 'ACQUIRE', 'ADDRESS', 'SUPPORT'
    ],
    'ANIMALS': [
        'ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN', 'KANGAROO',
        'LEOPARD', 'OCTOPUS', 'BUTTERFLY', 'CROCODILE', 'RHINOCEROS',
        'MONKEY', 'TIGER', 'TURTLE', 'CAMEL', 'DRAGON',
        'FISH', 'LION', 'WHALE', 'EAGLE', 'FOX',
        'GOAT', 'PIG', 'CAT', 'DOG', 'OWL'
    ],
    'FOOD': [
        'PIZZA', 'BURGER', 'SPAGHETTI', 'CHOCOLATE', 'PANCAKE',
        'SANDWICH', 'AVOCADO', 'CUPCAKE', 'POPCORN', 'STRAWBERRY',
        'APPLE', 'BREAD', 'JUICE', 'MILK', 'SALT',
        'EGG', 'ORANGE', 'OVEN'
    ],
    'NATURE': [
        'EARTH', 'TREE', 'RAIN', 'WIND', 'ISLAND',
        'PARK', 'HILL', 'BEACH', 'FIRE', 'ICE',
        'MOON', 'SUN', 'LEAF', 'PINE', 'GARDEN',
        'HABITAT', 'HORIZON', 'NATURAL'
    ],
    'HOUSEHOLD': [
        'CHAIR', 'LAMP', 'UMBRELLA', 'VASE', 'WALL',
        'DESK', 'BAG', 'HAT', 'JAR', 'RING',
        'TOP', 'UNIT', 'VAN', 'EXIT', 'URN'
    ],
    'ACTIVITIES': [
        'DANCE', 'GAME', 'VOTE', 'JUMP', 'LAUGH',
        'OPEN', 'QUIET', 'WAIT', 'ACHIEVE', 'ACCEPT',
        'APPROVE', 'ARRANGE', 'BALANCE', 'FOCUS', 'JOURNEY',
        'PROMISE', 'PROTECT', 'PURCHASE', 'REDUCE', 'SOCCER'
    ],
    'ABSTRACT': [
        'NAME', 'KING', 'QUEEN', 'ABILITY', 'ABSENCE',
        'ACADEMY', 'ADVANCE', 'AMAZING', 'ANCIENT', 'APPEAL',
        'BEAUTY', 'BIOLOGY', 'CAPITAL', 'CAREER', 'CIRCLE',
        'CLASSIC', 'COLLEGE', 'COMMON', 'CULTURE', 'DANGER',
        'DEBATE', 'DECLINE', 'DOCTOR', 'DEMAND', 'ENERGY',
        'ENEMY', 'ESCAPE', 'EXHIBIT', 'FORTUNE', 'FRIENDLY',
        'FUTURE', 'GENDER', 'GLIMPSE', 'GROWTH', 'HAZARD',
        'HOSPITAL', 'HUMOR', 'ILLUSION', 'INCOME', 'INSERT',
        'JUSTICE', 'KINGDOM', 'LANGUAGE', 'LECTURE', 'LIBRARY',
        'LOVELY', 'LUXURY', 'MASTER', 'MYSTERY', 'NUMBER',
        'OFFICE', 'OPTION', 'PATIENT', 'POWER', 'QUALITY',
        'RELIABLE', 'SCIENCE', 'SPECIES', 'STRANGER', 'TALENT',
        'TUNNEL', 'UNIQUE', 'URGENT', 'VEHICLE', 'VOLUME'
    ],
    'COLORS': [
        'YELLOW', 'GOLD', 'BLUE', 'RED', 'GREEN'
    ],
    'OBJECTS': [
        'BALL', 'KITE', 'PAPER', 'ROAD', 'SHOE',
        'X-RAY', 'YARN', 'ZERO', 'INK', 'MAP',
        'NET', 'ROPE', 'ACE', 'BICYCLE', 'BORDER',
        'CAMERA'
    ]
};

// Flatten all words for random selection
const allWords = Object.values(wordCategories).flat();

// Game state variables
let selectedWord = '';
let guessedLetters = [];
let remainingAttempts = 6;
let gameOver = false;
let currentCategory = '';
let score = 0;

// Sound effects
const sounds = {
    correct: new Audio('assets/correct.mp3'),
    incorrect: new Audio('assets/incorrect.mp3'),
    win: new Audio('assets/win.mp3'),
    lose: new Audio('assets/lose.mp3')
};

// DOM elements
const wordDisplayElement = document.getElementById('word-display');
const attemptsElement = document.getElementById('attempts');
const messageElement = document.getElementById('message');
const guessedLettersElement = document.getElementById('guessed-letters');
const keyboardElement = document.getElementById('keyboard');
const newGameButton = document.getElementById('new-game-btn');
const scoreElement = document.getElementById('score');

// Hangman parts in order of display
const hangmanParts = [
    'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'
];

// Array of background images
const backgroundImages = [
    'background.img/pixel-art-rural-landscape-background_52683-125366.avif',
    'background.img/pixel-art-rural-landscape-background_52683-125379.avif',
    'background.img/pixel-art-rural-landscape-background_23-2150592917.avif',
    'background.img/pixel-art-rural-landscape-background_23-2150592944.avif',
    'background.img/pixel-art-rural-landscape-background_23-2150592954.avif',
    'background.img/images.jpeg',
    'background.img/positive-affirmations-to-overcome-fear.jpg'
];

// Keep track of the current background image index
let currentBackgroundIndex = -1;

// Function to set background image
function changeBackgroundImage() {
    // Select a new random index different from the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (newIndex === currentBackgroundIndex && backgroundImages.length > 1);
    
    currentBackgroundIndex = newIndex;
    document.body.style.backgroundImage = `url('${backgroundImages[currentBackgroundIndex]}')`;  
}

// Initialize the game
function initGame() {
    // Reset game state
    const categories = Object.keys(wordCategories);
    currentCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryWords = wordCategories[currentCategory];
    selectedWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    gameOver = false;
    score = 0;
    
    // Change background image
    changeBackgroundImage();
    
    // Reset UI
    updateWordDisplay();
    updateAttemptsDisplay();
    updateGuessedLettersDisplay();
    updateScoreDisplay();
    resetHangmanDisplay();
    createKeyboard();
    messageElement.textContent = `Category: ${currentCategory}`;
    messageElement.style.color = '#2196F3';
    
    // Remove any animation classes
    wordDisplayElement.classList.remove('celebrate', 'shake');
}

// Create the keyboard
function createKeyboard() {
    keyboardElement.innerHTML = '';
    
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const keyButton = document.createElement('button');
        keyButton.textContent = letter;
        keyButton.classList.add('key');
        keyButton.addEventListener('click', () => handleGuess(letter));
        keyboardElement.appendChild(keyButton);
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (gameOver || guessedLetters.includes(letter)) {
        return;
    }
    
    guessedLetters.push(letter);
    
    // Disable the key
    const keyElement = Array.from(document.querySelectorAll('.key'))
        .find(key => key.textContent === letter);
    if (keyElement) {
        keyElement.classList.add('disabled');
        keyElement.disabled = true;
    }
    
    if (selectedWord.includes(letter)) {
        // Correct guess
        sounds.correct.play();
        keyElement.classList.add('correct');
        updateWordDisplay();
        score += 10;
        updateScoreDisplay();
        checkWinCondition();
    } else {
        // Incorrect guess
        sounds.incorrect.play();
        keyElement.classList.add('incorrect');
        remainingAttempts--;
        updateAttemptsDisplay();
        updateHangmanDisplay();
        checkLoseCondition();
    }
    
    updateGuessedLettersDisplay();
}

// Update the word display
function updateWordDisplay() {
    wordDisplayElement.textContent = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

// Update the attempts display
function updateAttemptsDisplay() {
    attemptsElement.textContent = remainingAttempts;
}

// Update the guessed letters display
function updateGuessedLettersDisplay() {
    guessedLettersElement.textContent = guessedLetters.join(', ');
}

// Update the score display
function updateScoreDisplay() {
    scoreElement.textContent = score;
}

// Update the hangman display
function updateHangmanDisplay() {
    const incorrectGuesses = 6 - remainingAttempts;
    
    for (let i = 0; i < incorrectGuesses; i++) {
        const part = document.getElementById(hangmanParts[i]);
        if (part) {
            part.style.display = 'block';
        }
    }
}

// Reset the hangman display
function resetHangmanDisplay() {
    hangmanParts.forEach(part => {
        const element = document.getElementById(part);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Check win condition
function checkWinCondition() {
    const wordStatus = selectedWord
        .split('')
        .every(letter => guessedLetters.includes(letter));
    
    if (wordStatus) {
        gameOver = true;
        sounds.win.play();
        score += 50 + (remainingAttempts * 10); // Bonus points for remaining attempts
        messageElement.textContent = `You won! 🎉 Score: ${score}`;
        messageElement.style.color = '#4CAF50';
        
        // Create confetti effect
        createConfetti();
        
        // Make the word display celebrate
        wordDisplayElement.classList.add('celebrate');
    }
}

// Create confetti effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Check lose condition
function checkLoseCondition() {
    if (remainingAttempts <= 0) {
        gameOver = true;
        sounds.lose.play();
        messageElement.textContent = `You lost! The word was: ${selectedWord} | Score: ${score}`;
        messageElement.style.color = '#f44336';
        
        // Reveal the word with shake animation
        wordDisplayElement.classList.add('shake');
        wordDisplayElement.textContent = selectedWord.split('').join(' ');
    }
}

// Event listeners
newGameButton.addEventListener('click', initGame);

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);