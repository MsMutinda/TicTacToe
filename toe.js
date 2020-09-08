const display = document.querySelector('.game-status'); //store element for the game status display
let game = True; //when game is in play
let currentPlayer = "X"; //who's turn it is
let gameStatus = ["", "", "", "", "", "", "", "", ""]; //array to store the game status to help with tracking already played cells
//messages to be displayed when the game draws, is won, or when it's the next player's turn
const win = () => '${currentPlayer} has won!';
const draw = () => 'That was a draw!';
const playerTurn = () => "It's now ${currentPlayer}'s turn";
//array to store the values of cell indexes that need to be populated for one to win
display.innerHTML = playerTurn();
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 
//function to update the game interface when a move has been played
function playedCell(clickedCell, clickedCellIndex) {
    gameStatus[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function changePlayers() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    display.innerHTML = playerTurn();
}
//function to check the result of the game, whether a win or draw
function result() {
    let roundWon = false;
    //check whether any of the winning conditions have been met 
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameStatus[winCondition[0]];
        let b = gameStatus[winCondition[1]];
        let c = gameStatus[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        display.innerHTML = win();
        game = false;
        return;
}
    let roundDraw = !gameStatus.includes("");
    if (roundDraw) {
        display.innerHTML = draw();
        game = false;
        return;
    }
    //if no one has won yet, continue with the game by changing the players
    changePlayers();
}
//function to track clicked cells
function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; //check if cell has been clicked
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //data-cell-index is picked as a string, so it needs to be converted to an integer
    if(gameStatus[clickedCellIndex] !== "" || !game) {
        return;
    } //check if that cell has already been played, or if the game is on pause. If both are true, ignore and proceed with the game
    playedCell(clickedCell, clickedCellIndex);
    result();
}
//function to change game variables back to their initial values
function resetGame() {
    game = true;
    currentPlayer = "X";
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    display.innerHTML = playerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventlistener('click', cellClick()));
document.querySelector('.reset').addEventListener('click', resetGame());
