let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let hidek = document.querySelector(".hidek");

let turno = true; // true = O, false = X
let count = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const resetGame = () => {
    turno = true;
    count = 0;
    msgContainer.classList.add("hide");
    hidek.style.display = "flex";
    enableBtns();
};

const enableBtns = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-glow", "x-glow");
    });
};

const disableBtns = () => {
    boxes.forEach((box) => box.disabled = true);
};

const showWinner = (winner) => {
    msg.innerText = winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`;
    msgContainer.classList.remove("hide");
    hidek.style.display = "none";
    disableBtns();
};

const checkWinner = () => {
    for (let p of winPatterns) {
        let p1 = boxes[p[0]].innerText;
        let p2 = boxes[p[1]].innerText;
        let p3 = boxes[p[2]].innerText;

        if (p1 !== "" && p1 === p2 && p2 === p3) {
            showWinner(p1);
            return true;
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
            box.classList.add("o-glow");
            turno = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-glow");
            turno = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (!isWinner && count === 9) {
            showWinner("Draw");
        }
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);