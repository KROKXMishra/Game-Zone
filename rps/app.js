let userScore=0;
let comScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const uScore=document.querySelector("#user-score");
const cScore=document.querySelector("#comp-score");


const genComChoice=()=>{
    const options = ["rock","paper","scissors"];
     const randIndex=Math.floor(Math.random()*1000);
    return options[randIndex%3];
}

const drawGame=()=>{
    msg.innerText="Draw! Play Again.";
    msg.style.backgroundColor="#ef476f"
}

const shoWinner=(userWin,userChoice,comChoice)=>{
    if(userWin) {
        
        msg.innerText=`You win : Your ${userChoice} beats ${comChoice}`;
        msg.style.backgroundColor="#37d92eff"
    }
    else {
        msg.innerText=`You loss : ${comChoice} beats your ${userChoice}`;
        msg.style.backgroundColor="red"
    }
} 

const scoreView=(userWin)=>{
    if(userWin) {
        userScore++;
        uScore.innerText=userScore;
    }
    else {
        comScore++;
        cScore.innerText=comScore;
    }
}

const playGame=(userChoice)=>{
    const comChoice=genComChoice();
    if(userChoice===comChoice){ 
        drawGame();
    }
    else{
        let userWin= true;
        if(userChoice==="rock"){
            userWin= comChoice==="paper"?false:true;
        }
        else if(userChoice==="paper"){
            userWin= comChoice==="scissors"?false:true;
        }
        else if(userChoice==="scissors"){
            userWin= comChoice==="rock"?false:true;
        }
         shoWinner(userWin,userChoice,comChoice);
         scoreView(userWin);
    }
}

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        let userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});