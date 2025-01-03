/* JavaScript (script.js) */
const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
let currentPlayer = 'X';
let gameActive = true;
const gameState = Array(9).fill(null);

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

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes(null) ? null : 'Draw';
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (!gameActive || gameState[cellIndex]) return;

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    const result = checkWinner();
    if (result) {
        gameActive = false;
        winnerDisplay.textContent = result === 'Draw' ? 'It\'s a Draw!' : `${result} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState.fill(null);
    winnerDisplay.textContent = '';
    board.innerHTML = '';
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

createBoard();
