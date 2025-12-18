const games=document.querySelectorAll(".menu a");

games.forEach(game=>{
    game.addEventListener("click",e=>{
        e.preventDefault();
        window.location.href=game.getAttribute("href");
    });
});
