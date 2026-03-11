document.addEventListener("DOMContentLoaded", () => {
    const games = document.querySelectorAll(".menu a");

    games.forEach(game => {
        game.addEventListener("click", e => {
            e.preventDefault();
            const path = game.getAttribute("href");
            if (path) {
                window.location.href = path;
            }
        });
    });
});
