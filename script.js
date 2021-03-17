console.log('I\'ve been properly linked');

let ticTacGrid = document.querySelector('.ticTacContainer')
let squares = ticTacGrid.querySelectorAll('.square')
let playerTurn = true  //if true, Player 1 turn, else Player 2 turn
let boardFilled = []

console.log(ticTacGrid)
console.log(squares)

squares.forEach((sq) => {
        sq.addEventListener(('click'), event => {
            if (playerTurn) {
                event.target.innerText = 'X'
                playerTurn = false
            } else {
                event.target.innerText = 'O'
                playerTurn = true
            }
            //console.log(event.target.innerText)
            //console.log('I\'ve been clicked!')
        })
})










