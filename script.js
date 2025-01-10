const cells = document.querySelectorAll(".cell");
const playerTurnElement = document.getElementById('player-turn');
const restartBtn = document.getElementById('restart-btn')
const aiBtn = document.getElementById('ai-btn')
let currentPlayer = "X";
let isAI = false;
board = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];
cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

restartBtn.addEventListener("click", resetGame);

aiBtn.addEventListener("click", () => {
    isAI = !isAI;
    aiBtn.textContent = isAI ? "Play Against Human" : "Play Against AI";
    resetGame();
})

function handleClick(event) {
  const cell = event.target;
  console.log(cell);
  const index = cell.dataset.index;

  // Place the mark (X or O)
  cell.textContent = currentPlayer;
  board[index] = currentPlayer;

  if (checkWin(currentPlayer)) {
    showWinningMessage(currentPlayer);
  } else if (board.every((cell) => cell !== "")) {
    const winningMessage = document.getElementById("winner");
    winningMessage.textContent = "It's a draw!";
    winningMessage.style.display = "block";
  } else {
    if (isAI) {
      currentPlayer = "X";
      playerTurnElement.textContent = `Current Player: AI`;
        setTimeout(makeAIMove, 1000);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerTurnElement.textContent = `Current Player: ${currentPlayer}`;
    }
  }
}

function checkWin(player) {
    return winningCombinations.find(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";
  playerTurnElement.textContent = `Current Player: ${currentPlayer}`;
  const winningMessage = document.getElementById("winner");
  winningMessage.style.display = "none";
  winningMessage.textContent = "";
  
}

function makeAIMove() {
    let emptyCells = [];
    board.forEach((value, index) => {
        if (value === '') {
            emptyCells.push(index);
        }
    })

    // Random AI move
    const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[aiMove] = 'O';
    cells[aiMove].textContent = 'O';
    cell.removeEventListener('click', handleClick);

    //Check for a win or draw after ai move
    if(checkWin('O')) {
        showWinningMessage('AI');
    } else {
        currentPlayer = 'X';
        playerTurnElement.textContent = `Current Player: ${currentPlayer}`;
    }

}

function showWinningMessage(player) {
  const winningMessage = document.getElementById("winner");
  winningMessage.textContent = `Player ${player} wins!`;
  winningMessage.style.display = "block";
}
