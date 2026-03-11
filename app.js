const gridDisplay = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#score');
const bestScoreDisplay = document.querySelector('#best-score');
const overDisplay = document.querySelector('#game-over');
const overMsg = document.querySelector('#over-msg');

let width = 4;
let squares = [];
let score = 0;
let bestScore = localStorage.getItem('2048-best') || 0;
bestScoreDisplay.innerHTML = bestScore;

// Create the board
function createBoard() {
    gridDisplay.innerHTML = '';
    squares = [];
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.innerHTML = "";
        square.className = "cell";
        gridDisplay.appendChild(square);
        squares.push(square);
    }
    addNumber();
    addNumber();
}

function addNumber() {
    let emptySquares = squares.filter(s => s.innerHTML === "");
    if (emptySquares.length > 0) {
        let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        randomSquare.innerHTML = Math.random() > 0.1 ? 2 : 4;
        updateStyles();
        checkGameOver();
    }
}

function updateStyles() {
    squares.forEach(square => {
        square.className = "cell"; // Reset
        if (square.innerHTML !== "") {
            square.classList.add(`tile-${square.innerHTML}`);
        }
    });
}

// Slidng Logic
function move(direction) {
    let hasMoved = false;
    for (let i = 0; i < 4; i++) {
        let line = [];
        for (let j = 0; j < 4; j++) {
            if (direction === 'left' || direction === 'right') line.push(parseInt(squares[i * 4 + j].innerHTML) || 0);
            else line.push(parseInt(squares[j * 4 + i].innerHTML) || 0);
        }

        if (direction === 'right' || direction === 'down') line.reverse();
        
        let filteredLine = line.filter(num => num !== 0);
        for (let j = 0; j < filteredLine.length - 1; j++) {
            if (filteredLine[j] === filteredLine[j+1]) {
                filteredLine[j] *= 2;
                score += filteredLine[j];
                filteredLine.splice(j+1, 1);
                hasMoved = true;
            }
        }
        
        while (filteredLine.length < 4) filteredLine.push(0);
        if (direction === 'right' || direction === 'down') filteredLine.reverse();

        for (let j = 0; j < 4; j++) {
            let index = (direction === 'left' || direction === 'right') ? (i * 4 + j) : (j * 4 + i);
            if (parseInt(squares[index].innerHTML || 0) !== filteredLine[j]) hasMoved = true;
            squares[index].innerHTML = filteredLine[j] === 0 ? "" : filteredLine[j];
        }
    }
    if (hasMoved) {
        addNumber();
        scoreDisplay.innerHTML = score;
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('2048-best', bestScore);
            bestScoreDisplay.innerHTML = bestScore;
        }
    }
}

// Inputs
function control(e) {
    if (e.key === 'ArrowLeft') move('left');
    else if (e.key === 'ArrowRight') move('right');
    else if (e.key === 'ArrowUp') move('up');
    else if (e.key === 'ArrowDown') move('down');
}
document.addEventListener('keydown', control);

function checkGameOver() {
    let zeros = squares.filter(s => s.innerHTML === "").length;
    if (zeros === 0) {
        // Check if merges are still possible
        overDisplay.classList.remove('hide');
    }
    squares.forEach(s => {
        if(s.innerHTML == "2048") {
            overMsg.innerHTML = "You Won!";
            overDisplay.classList.remove('hide');
        }
    });
}

function startGame() {
    overDisplay.classList.add('hide');
    score = 0;
    scoreDisplay.innerHTML = 0;
    createBoard();
}

startGame();