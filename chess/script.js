const boardElement = document.getElementById('chess-board');
const statusElement = document.getElementById('status');
const game = new Chess();
let selectedSquare = null;

const pieceIcons = {
    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
};

function renderBoard() {
    boardElement.innerHTML = '';
    const board = game.board();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            const squareName = String.fromCharCode(97 + j) + (8 - i);
            const isLight = (i + j) % 2 === 0;
            
            square.className = `square ${isLight ? 'light' : 'dark'}`;
            square.dataset.pos = squareName;

            const piece = board[i][j];
            if (piece) {
                const span = document.createElement('span');
                span.innerText = pieceIcons[piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase()];
                span.className = `piece ${piece.color === 'w' ? 'white-piece' : 'black-piece'}`;
                square.appendChild(span);
            }

            square.addEventListener('click', () => handleSquareClick(squareName));
            boardElement.appendChild(square);
        }
    }
    updateStatus();
}

function handleSquareClick(pos) {
    const moves = game.moves({ square: pos, verbose: true });

    if (selectedSquare === pos) {
        selectedSquare = null;
        renderBoard();
        return;
    }

    if (selectedSquare) {
        const move = game.move({ from: selectedSquare, to: pos, promotion: 'q' });
        if (move) {
            selectedSquare = null;
            renderBoard();
            checkGameOver();
            return;
        }
    }

    const piece = game.get(pos);
    if (piece && piece.color === game.turn()) {
        selectedSquare = pos;
        renderBoard(); // Clear previous highlights
        highlightMoves(moves);
        document.querySelector(`[data-pos="${pos}"]`).classList.add('selected');
    }
}

// FIXED: Now uses the color-specific classes from your CSS
function highlightMoves(moves) {
    const turn = game.turn(); // 'w' or 'b'
    const highlightClass = turn === 'w' ? 'highlight-white' : 'highlight-black';
    
    moves.forEach(m => {
        const targetSquare = document.querySelector(`[data-pos="${m.to}"]`);
        if (targetSquare) {
            targetSquare.classList.add(highlightClass);
        }
    });
}

function updateStatus() {
    let status = game.turn() === 'w' ? "White's Turn" : "Black's Turn";
    if (game.in_check()) status += " (CHECK!)";
    statusElement.innerText = status;
}

function checkGameOver() {
    if (game.game_over()) {
        if (game.in_checkmate()) {
            alert("CHECKMATE! " + (game.turn() === 'w' ? 'Black' : 'White') + " wins!");
        } else if (game.in_draw()) {
            alert("GAME OVER: Draw!");
        }
        game.reset();
        renderBoard();
    }
}

renderBoard();