console.log('I\'ve been properly linked');

let ticTacGrid = document.querySelector('.ticTacContainer')
let squares = ticTacGrid.querySelectorAll('.square')
let playerTurn = true  //if true, Player 1 turn, else Player 2 turn
let boardFilled = []

let winConditions = {
    topRow: ['X','O','X'],
    middleRow: ['X','O','X'],
    bottomRow: ['O','X','O'],
    leftColumn: ['X','O','O'],
    middleColumn: ['O','O','X'],
    rightColumn: ['X','O','X'],
    leftDiagonal: ['X','X','X'],
    rightDiagonal: ['O','O','X'],
}
let playerOneCount = 0
let playerTwoCount = 0
console.log(ticTacGrid)
console.log(squares)

const userSquareSelection = (function()  {  //had to use named functions to be able to remove EventListener
    let placeUserSelection = function(event) { //as there wasn't a way to do it within the listener definition
        if (playerTurn) {
            event.target.innerText = 'X'
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
                            return
                        }
                        if(playerTwoCount == 3) {
                            console.log(`Winner in: ${winConditionsKey} , ${winConditions[winConditionsKey]}`, playerTwoCount)
                            return
                        }
                    }
                    console.log("No winner yet...")
                    playerOneCount=0
                    playerTwoCount=0

                    // winConditionsKey.forEach((condition) => {
                    //     if(condition)
                    //         }
                    //console.log(winConditions[winConditionsKey])
                }

            }
            //console.log(event.target.innerText)
            this.removeEventListener('click', placeUserSelection)
            playerTurn = false
        } else {
            event.target.innerText = 'O'
            //console.log(event.target.innerText)
            this.removeEventListener('click', placeUserSelection)
            playerTurn = true
        }
    };
    return placeUserSelection;
})( 0 );

squares.forEach((sq) => {
        sq.addEventListener(('click'), userSquareSelection);
            // if (playerTurn) {
            //     event.target.innerText = 'X'
            //     playerTurn = false
            // } else {
            //     event.target.innerText = 'O'
            //     playerTurn = true
            // }
            //console.log(event.target.innerText)
            //console.log('I\'ve been clicked!')
        //})
})





// function acquiredStone(stoneReponse) {
//     let index = gauntlet.indexOf(stoneReponse);
//     if (index > -1) {
//         gauntlet.splice(index, 1);
//     }
// }










