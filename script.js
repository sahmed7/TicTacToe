console.log('I\'ve been properly linked');

let ticTacGrid = document.querySelector('.ticTacContainer')
let squares = ticTacGrid.querySelectorAll('.square')
let playerTurn = true  //if true, Player 1 turn, else Player 2 turn
let boardFilled = []

console.log(ticTacGrid)
console.log(squares)

const userSquareSelection = (function()  {  //had to use named functions to be able to remove EventListener
    let placeUserSelection = function(event) { //as there wasn't a way to do it within the listener definition
        if (playerTurn) {
            event.target.innerText = 'X'
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










