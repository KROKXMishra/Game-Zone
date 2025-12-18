let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let hidek=document.querySelector(".hidek");
let turno=true;
let count=0;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turno=true;
    msgContainer.classList.add("hide");
    enableBtns();
    count=0;
    hidek.style.display="block";
}

const enableBtns=()=>{
    turno=true;
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
    });
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count++;
        if(turno) {
            box.innerText="O";
            turno=false;
        }
        else {
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;
        let c=checkWinner();
        if(!c && count==9){
            msg.innerText=`Draw!`;
            msgContainer.classList.remove("hide");
            hidek.style.display="none";
        }
    });
});

const disableBtns=()=>{
    turno=true;
    boxes.forEach((box)=>{
        box.disabled=true;
    });
}

const showWinner=(winner)=>{
    msg.innerText=`Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    hidek.style.display="none";
    disableBtns();
}


const checkWinner=()=>{
    for(let p of winPatterns){
        let p1=boxes[p[0]].innerText;
        let p2=boxes[p[1]].innerText;
        let p3=boxes[p[2]].innerText;
        if((p1!=""&&p2!=""&&p3!="")&&(p1===p2&&p2===p3)){ 
            console.log("winner");
            showWinner(p1);
        }
    }
 };

 newBtn.addEventListener("click",resetGame);
 resetBtn.addEventListener("click",resetGame);
