const board = document.getElementById("board");
let cells = [];

// Create the 9x9 grid
for (let i = 0; i < 81; i++) {
    let input = document.createElement("input");
    input.type = "number"; // Better for mobile keyboards
    input.maxLength = 1;

    input.oninput = () => {
        if (input.value.length > 1) input.value = input.value.slice(0, 1);
        if (input.value < 1 || input.value > 9) {
            input.value = "";
        }
    };

    cells.push(input);
    board.appendChild(input);
}

function getGrid() {
    return cells.map(c => c.value === "" ? 0 : parseInt(c.value));
}

function setGrid(grid) {
    grid.forEach((v, i) => {
        cells[i].value = v === 0 ? "" : v;
    });
}

function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        // Check row
        if (grid[row * 9 + i] === num) return false;
        // Check column
        if (grid[i * 9 + col] === num) return false;
        // Check 3x3 box
        let r = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        let c = Math.floor(col / 3) * 3 + (i % 3);
        if (grid[r * 9 + c] === num) return false;
    }
    return true;
}

function solve(grid) {
    for (let i = 0; i < 81; i++) {
        if (grid[i] === 0) {
            let row = Math.floor(i / 9);
            let col = i % 9;
            for (let n = 1; n <= 9; n++) {
                if (isValid(grid, row, col, n)) {
                    grid[i] = n;
                    if (solve(grid)) return true;
                    grid[i] = 0;
                }
            }
            return false;
        }
    }
    return true;
}

function solveSudoku() {
    let grid = getGrid();
    if (solve(grid)) {
        setGrid(grid);
    } else {
        alert("No solution exists for this puzzle!");
    }
}

function clearBoard() {
    cells.forEach(c => c.value = "");
}