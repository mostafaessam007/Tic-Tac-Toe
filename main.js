const display = document.querySelector(".display");
const restartBtn = document.querySelector(".restartBtn");
const cell = document.querySelectorAll(".cell");



//Gameboard "canvas"
const Gameboard = (function (){

const board = ["","","","","","","","",""];


 //a placeMark function that takes the index/cell the player wants to update and who is the current player
 function placeMark(currentPlayer,index) {
        board[index] = currentPlayer
        console.log(board);
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
 
 return {placeMark,board,checkWinner, checkTie}
})();


//Game controller
const GameController = (function () {
    //the controller remember the current player
    //switch between two players
    let playerX = "X";
    let playerO = "O";
    let currentPlayer = playerX;
    let gameOver = false;
    
    console.log(`It's player ${currentPlayer} turn`);
    
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
              console.log("We have a winner!!!");
              gameOver = true;
              return;
        } else {
            if (Gameboard.checkTie()) {
                console.log("It's a tie!");
                gameOver = true;
              return;
            } else {
                 switchPlayer();
                 console.log(`It's player ${currentPlayer} turn`);
            }
        }
            
       }else{
        console.log("This cell is already occupied, please choose another cell!");
        console.log(`It's player ${currentPlayer} turn`);
       }
        }else {
            console.log("Game is already over!");
            return;
        }
    }
   return {switchPlayer,playTurn}
})();

const displayBoard =() =>{
    board.array.forEach(element => {
        
    });
}