console.log('I\'ve been properly linked');

let ticTacGrid = document.querySelector('.ticTacContainer')
let squares = ticTacGrid.querySelectorAll('.square')
let playerTurn = true  //if true, Player 1 turn, else Player 2 turn
let resetButton = document.querySelector('#resetBtn')
let whoWonDisplay = document.querySelector('#whoWon')

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
let playerOneCount = 0
let playerTwoCount = 0
let playerOneSymbol = 'X'
let playerTwoSymbol = 'O'
console.log(ticTacGrid)
console.log(squares)

function checkWinCondition() {
    for (let winConditionsKey in winConditions) {
        if(winConditions[winConditionsKey].length==3) {
            for(let i=0; i<3; i++) {
                if(winConditions[winConditionsKey][i] == 'X') {
                    playerOneCount++
                    console.log(`Player One Count: ${playerOneCount}`)
                } else if(winConditions[winConditionsKey][i] == 'O'){
                    playerTwoCount++
                    console.log(`Player Two Count: ${playerTwoCount}`)
                }
                if(playerOneCount == 3) {
                    console.log(`Winner in: ${winConditionsKey} , ${winConditions[winConditionsKey]}`, playerOneCount)
                    removeRemainingListeners()
                    playerOneCount = 1
                    whoWonDisplay.innerText = `Player ${playerOneCount} Wins!`
                    whoWonDisplay.style.display = 'block'
                    resetButton.style.display = 'block'
                    return
                }
                if(playerTwoCount == 3) {
                    console.log(`Winner in: ${winConditionsKey} , ${winConditions[winConditionsKey]}`, playerTwoCount)
                    removeRemainingListeners()
                    playerTwoCount = 2
                    whoWonDisplay.innerText = `Player ${playerTwoCount} Wins!`
                    whoWonDisplay.style.display = 'block'
                    resetButton.style.display = 'block'
                    return
                }
            }
            console.log("No winner yet...")
            playerOneCount=0
            playerTwoCount=0
        }
    }
}

function placeUserSelection(event) {
    if (playerTurn) {  // could've maybe used ternary here (if statement is true) ? "do this" : "else do this", but this is cleaner
        event.target.innerText = playerOneSymbol
        //console.log(event.target.innerText)
        addPlayerChoiceToWinConditions(event.target.id, playerOneSymbol)
        console.log(winConditions)
        checkWinCondition()
        playerTurn = false
    } else {
        event.target.innerText = playerTwoSymbol
        addPlayerChoiceToWinConditions(event.target.id, playerTwoSymbol)
        console.log(winConditions)
        checkWinCondition()
        //console.log(event.target.innerText)
        playerTurn = true
    }
}

function removeRemainingListeners() {
    squares.forEach((square) => {
        square.removeEventListener('click', placeUserSelection)
    })
}

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
            console.log("Thanos, that is not one of the remaining six Infinity Stones. Try again.");
    }

}


squares.forEach((square) => {
    square.addEventListener(('click'), placeUserSelection, {once: true});
})

resetButton.addEventListener("click", () => location.reload());











