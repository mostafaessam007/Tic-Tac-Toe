const display = document.querySelector(".display");
const restartBtn = document.querySelector(".restartBtn");



//Gameboard "canvas"
const Gameboard = (function (){

const board = ["","","","","","","","",""];


 //a placeMark function that takes the index/cell the player wants to update and who is the current player
 function placeMark(currentPlayer,index) {
        board[index] = currentPlayer
 }
 function resetBoard() {
    for (let index = 0; index < board.length; index++) {
        board[index]=""
    }
 }
 const winnerCondtions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ]

    function checkWinner() {
     for (let pattern of winnerCondtions) {
     const [a,b,c] = pattern  ;
     if (
        board[a]!=="" &&
        board[a]===board[b]&&
        board[b]===board[c]) {
        return true;
     } 
 }
 return false;
    }

    function checkTie() {
        return board.every(cell => cell !=="")
    }
 
 return {placeMark,board,checkWinner, checkTie, resetBoard}
})();

let playerX = "X";
    let playerO = "O";
    let currentPlayer = playerX;
    let gameOver = false;
//Game controller
const GameController = (function () {
    //the controller remember the current player
    //switch between two players
    
    
    display.textContent =`It's player ${currentPlayer} turn`;
    
    function switchPlayer() {
       currentPlayer === playerX ? currentPlayer = playerO :currentPlayer =  playerX;
    }    

    //a function that takes the move location and checks with the board if the cell is empty or not
    // if yes, it takes the current player and the move location "index" as arguemnts 
    
    const playTurn = (index) =>{
        if (gameOver===false) {
            if (Gameboard.board[index]==="") {
        Gameboard.placeMark(currentPlayer,index);
        if (Gameboard.checkWinner()) {
              display.textContent =`Player ${currentPlayer} is the winner!!!`;
              gameOver = true;
              return;
        } else {
            if (Gameboard.checkTie()) {
                display.textContent ="It's a tie!";
                gameOver = true;
              return;
            } else {
                 switchPlayer();
                 display.textContent =`It's player ${currentPlayer} turn`;
            }
        }
            
       }else{
        display.textContent ="This cell is already occupied, please choose another cell !";
    //    display.textContent =`It's player ${currentPlayer} turn`;
       }
        }else {
            display.textContent ="Game is already over!";
            return;
        }
    }
   return {switchPlayer,playTurn}
})();

const displayController =(() =>{
const cell = document.querySelectorAll(".cell");

    function displayBoard () {
        cell.forEach((cell,index) => {
          cell.textContent = Gameboard.board[index];  
        });
    }
    function playerInput() {
        cell.forEach((cell,index) => {
            cell.addEventListener("click",()=>{
                GameController.playTurn(index);
                displayBoard()
            })
        });
        
    }
    displayBoard();
    playerInput()
    return {displayBoard,playerInput}
})();

restartBtn.addEventListener("click",()=>{
    gameOver = false;
    currentPlayer = playerX;
    display.textContent =`It's player ${currentPlayer} turn`;
    Gameboard.resetBoard()
    displayController.displayBoard();
    return;
});