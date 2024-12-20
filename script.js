// script.js

let currentPlayer = 'X'; // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let isGameActive = true; // Whether the game is active
const statusElement = document.getElementById('status');
const boardElement = document.getElementById('board');
const resultPopup = document.getElementById('resultPopup');
const resultMessageContainer = document.getElementById('resultMessageContainer');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

// Function to initialize the game
function initializeGame() {
    // Hide the result screen and reset game status
    resultPopup.style.display = 'none';
    resultPopup.style.opacity = '0';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusElement.textContent = "Player X's Turn";

    // Clear the game board
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    // If the cell is already filled or the game is over, do nothing
    if (gameBoard[index] || !isGameActive) {
        return;
    }

    // Update the board and display the current player's mark
    gameBoard[index] = currentPlayer;
    
    // Add 'X' or 'O' class to the clicked cell
    if (currentPlayer === 'X') {
        event.target.classList.add('x');
        event.target.textContent = 'X'; // Display X
    } else {
        event.target.classList.add('o');
        event.target.textContent = 'O'; // Display O
    }

    // Check for a winner or a draw
    checkGameStatus();

    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to check the game status (win or draw)
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check for a winner
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false;
            showPopup(`Player ${gameBoard[a]} Wins!`);
            highlightWinningCells(combination);
            return;
        }
    }

    // Check for a draw (if no empty spots and no winner)
    if (!gameBoard.includes('')) {
        isGameActive = false;
        showPopup("It's a Draw!");
    }
}

// Function to highlight the winning cells
function highlightWinningCells(combination) {
    combination.forEach(index => {
        const cell = boardElement.children[index];
        cell.style.backgroundColor = '#80e0a7'; // Green for winning cells
    });
}

// Function to show the popup message
function showPopup(message) {
    resultMessage.textContent = message;
    resultPopup.style.display = 'flex';
    setTimeout(() => {
        resultPopup.style.opacity = '1'; // Fade in the popup
    }, 10); // Short delay for smooth transition
}

// Function to reset the game
newGameButton.addEventListener('click', initializeGame);

// Initialize the game on load
initializeGame();
