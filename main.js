//Gameboard "canvas"
const Gameboard = (function (){

const board = ["1","2","3","4","5","6","7","8","9"];

 console.log(board);

 //a placeMark function that takes the index/cell the player wants to update and who is the current player
 function placeMark(currentPlayer,index) {
    board[index] = currentPlayer
    console.log(board);
    
 }
 return {placeMark}
})();




//Game controller
const GameController = (function () {
    //the controller remember the current player
    //switch between two players
    let playerX = "X";
    let playerO = "O";
    let currentPlayer = playerX;
    let round = 1;
    console.log(currentPlayer);
    
    let currentMove = "";
    function switchPlayer() {
       currentPlayer === playerX ? currentPlayer = playerO :currentPlayer =  playerX;
       console.log(currentPlayer);
    }    switchPlayer()

    //a function that takes the move location and checks with the board if the cell is empty or not
    // if yes, it takes the current player and the move location "index" as arguemnts 
    
    const playTurn = (index) =>{
        Gameboard.placeMark(currentPlayer,index)
    }
   return {switchPlayer,playTurn}
})();
GameController.playTurn(0);






//code test
function makeAddFunction(firstNumber) {
    return function returnedFunction(secondNumber) {
        return firstNumber + secondNumber
    }
}
const add5 = makeAddFunction(5)
// console.log(add5(10));

function createUser(name) {
    const discordName = "@" + name;
    let reputation = 0;
    const getReuptation =() => reputation;
    const giveReputation = () => {reputation++};

    return {name, discordName, getReuptation, giveReputation}
}
const mo = createUser("mo");
mo.giveReputation();
mo.giveReputation();

// console.log({
//     discordName: mo.discordName,
//     reputation: mo.getReuptation()
// });

function createPlayer(name,level) {
    const {getReuptation, giveReputation} = createUser(name);

    const increaseLevel = () => {level++;};

    return {name, getReuptation, giveReputation, level}
}
// console.log(createPlayer("mo",1));
