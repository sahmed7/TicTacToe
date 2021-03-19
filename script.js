console.log('I\'ve been properly linked');

// variable declarations where majority uses querySelector to grab pieces of the DOM for manipulation throughout code
let ticTacGrid = document.querySelector('.ticTacContainer')
let squares = ticTacGrid.querySelectorAll('.square')
let playerTurn = true  //if true, Player 1 turn, else Player 2 turn
let startGameToggle = false //default is false in case users want to play game with regular Xs and Os
let startGameButton = document.querySelector('#startGame')
let resetButton = document.querySelector('#resetBtn')
let whoWonDisplay = document.querySelector('#whoWon')
let cannotStartGameMessage = document.querySelector('#cannotStartMessage')
let whosTurnIsIt = document.querySelector('.playerTurnCenter')
let player1Choice = document.querySelector('#player1')
let player2Choice = document.querySelector('#player2')

//Object that uses the 8 possible win conditions as keys and an array holding user selection as values
let winConditions = {
    topRow: [],
    middleRow: [],
    bottomRow: [],
    leftColumn: [],
    middleColumn: [],
    rightColumn: [],
    leftDiagonal: [],
    rightDiagonal: []
}
let playerOneScore = 0      //used to increment player 1 value throughout winCondition object's values(arrays)
let playerTwoScore = 0      //used to increment player 2 value throughout winCondition object's values(arrays)
let playerOneSymbol = 'X'   //holds player 1's entered character, if nothing entered, default to X
let playerTwoSymbol = 'O'   //holds player 2's entered character, if nothing entered, default to O
let clickCounter = 0        //used for determining Cats game


/* Function below is the Win Conditions function that loops the winConditions object after user move
* to see if someone won - and upon winning condition being reached, it does:
- Calls function to remove other listeners to prevent user from clicking squares after game over
- Makes the hidden div appear that holds post-game info
- Updates post-game div with message of who won game, or if it is a tie
- Hides the Start Game button so that if win condition is reached early, it cannot be interacted with
* */
function checkWinCondition() {
    for (let winConditionsKey in winConditions) {
        if(winConditions[winConditionsKey].length==3) {
            for(let i=0; i<3; i++) {
                if(winConditions[winConditionsKey][i] == playerOneSymbol) {
                    playerOneScore++
                } else if(winConditions[winConditionsKey][i] == playerTwoSymbol){
                    playerTwoScore++
                }
                if(playerOneScore === 3) {
                    //console.log(`Winner in: ${winConditionsKey} , ${winConditions[winConditionsKey]}`, playerOneScore)
                    removeRemainingListeners()
                    whoWonDisplay.innerText = `Player ${playerOneSymbol} Wins!`
                    whoWonDisplay.style.display = 'block'
                    //resetButton.style.display = 'block'
                    startGameButton.style.display = 'none'
                    return
                }
                if(playerTwoScore === 3) {
                    removeRemainingListeners()
                    whoWonDisplay.innerText = `Player ${playerTwoSymbol} Wins!`
                    whoWonDisplay.style.display = 'block'
                    //resetButton.style.display = 'block'
                    startGameButton.style.display = 'none'
                    return
                }
                if(clickCounter===9) {
                    whoWonDisplay.innerText = `It's a Tie!`
                    whoWonDisplay.style.display = 'block'
                    resetButton.style.display = 'block'
                    startGameButton.style.display = 'none'
                    return
                }
            }
            playerOneScore=0
            playerTwoScore=0
        }
    }
}
/* Function below is primary eventHandler. Objectives outlined below:
- Places the player's value into the square
- Calls function to add the value to the winCondition object
- Increments the clickCounter used for Cats game check
- Calls checkWinCondition after every move
- Updates the display for whose turn it is
- toggles the playerTurn variable
*/
function placeUserSelection(event) {
    if(!startGameToggle){
        startGameButton.style.display = 'none'
    }
    if (playerTurn) {  // could've maybe used ternary here (if statement is true) ? "do this" : "else do this", but this is easier to read
        event.target.innerText = playerOneSymbol
        addPlayerChoiceToWinConditions(event.target.id, playerOneSymbol)
        clickCounter++
        checkWinCondition()
        whosTurnIsIt.innerText = `Player ${playerTwoSymbol}'s turn`
        playerTurn = false
    } else {
        event.target.innerText = playerTwoSymbol
        addPlayerChoiceToWinConditions(event.target.id, playerTwoSymbol)
        clickCounter++
        checkWinCondition()
        whosTurnIsIt.innerText = `Player ${playerOneSymbol}'s turn`
        playerTurn = true
    }
}
/* Function below is used in the checkWinCondition function for when winning condition is reached
* pretty quickly. Have to prevent user from clicker squares after game is over
*/
function removeRemainingListeners() {
    squares.forEach((square) => {
        square.removeEventListener('click', placeUserSelection)
    })
}

/*Function below takes the id of targeted square and the player's value and
adds it to winConditions object for win checking function
*/
function addPlayerChoiceToWinConditions(idOfDiv, symbol) {

    switch (idOfDiv) {
        case 'one':
            winConditions.topRow.push(symbol)
            winConditions.leftColumn.push(symbol)
            winConditions.leftDiagonal.push(symbol)
            break;
        case 'two':
            winConditions.topRow.push(symbol)
            winConditions.middleColumn.push(symbol)
            break;
        case 'three':
            winConditions.topRow.push(symbol)
            winConditions.rightColumn.push(symbol)
            winConditions.rightDiagonal.push(symbol)
            break;
        case 'four':
            winConditions.middleRow.push(symbol)
            winConditions.leftColumn.push(symbol)
            break;
        case 'five':
            winConditions.middleRow.push(symbol)
            winConditions.middleColumn.push(symbol)
            winConditions.leftDiagonal.push(symbol)
            winConditions.rightDiagonal.push(symbol)
            break;
        case 'six':
            winConditions.middleRow.push(symbol)
            winConditions.rightColumn.push(symbol)
            break;
        case 'seven':
            winConditions.bottomRow.push(symbol)
            winConditions.leftColumn.push(symbol)
            winConditions.rightDiagonal.push(symbol)
            break;
        case 'eight':
            winConditions.bottomRow.push(symbol)
            winConditions.middleColumn.push(symbol)
            break;
        case 'nine':
            winConditions.bottomRow.push(symbol)
            winConditions.rightColumn.push(symbol)
            winConditions.leftDiagonal.push(symbol)
            break;
        default:
            console.log("This actually got logged?!");
    }
}

/* Code below adds eventlistener to all 9 squares and uses function placeUserSelection for handling event
* I had thought about putting it all in a Start Game function requiring users to select their playing pieces
* before starting the game, but I thought it would be a tedious/annoying process if the users just wanted to
* reset the game and quickly get into another game with just Xs and Os
*/

// function startGame() {
    squares.forEach((square) => {
        square.addEventListener(('click'), placeUserSelection, {once: true});
    })
// }

/*Code below adds eventlistener to startGame button which sets the player's entered character to variables used
throughout code, starts the display of whose turn it is and toggles the option which is later used to hide button
Also checks if user tried starting game without entering any values in fields
*/
startGameButton.addEventListener('click', () => {
    console.log(cannotStartGameMessage)
    if(player1Choice.value === "" || player2Choice.value === "") {
        cannotStartGameMessage.innerText = 'Cannot start game until both players enter a character above'
    } else {
        playerOneSymbol = player1Choice.value
        playerTwoSymbol = player2Choice.value
        whosTurnIsIt.innerText = `Player ${playerOneSymbol}'s turn`
        startGameToggle=true
    }
})

//eventlistener and function used to reset the game back to initial load state
resetButton.addEventListener("click", () => location.reload())











