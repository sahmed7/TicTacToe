console.log('I\'ve been properly linked');

let ticTacGrid = document.querySelector('.ticTacContainer')
let squares = ticTacGrid.querySelectorAll('.square')
let playerTurn = true  //if true, Player 1 turn, else Player 2 turn
let boardFilled = []

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
                } else {
                    playerTwoCount++
                    console.log(`Player One Count: ${playerTwoCount}`)
                }
                if(playerOneCount == 3) {
                    console.log(`Winner in: ${winConditionsKey} , ${winConditions[winConditionsKey]}`, playerOneCount)
                    removeRemainingListeners()
                    return
                }
                if(playerTwoCount == 3) {
                    console.log(`Winner in: ${winConditionsKey} , ${winConditions[winConditionsKey]}`, playerTwoCount)
                    removeRemainingListeners()
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
        //console.log(winConditions.topRow)
        addPlayerChoiceToWinConditions(event.target.id, playerOneSymbol)
        checkWinCondition()
        playerTurn = false
    } else {
        event.target.innerText = playerTwoSymbol
        addPlayerChoiceToWinConditions(event.target.id, playerTwoSymbol)
        console.log(winConditions)
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












