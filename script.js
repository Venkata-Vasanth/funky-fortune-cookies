const fortunes = [
    "You're about to discover your next favorite song 🎶",
    "A golden retriever is thinking about you 🐶",
    "Your next coffee will be life-changing ☕",
    "The universe says, 'Go for it!' 🚀",
    "An unexpected meme will make you laugh today 😂",
    "Someone is low-key admiring your vibe 👀",
    "Big 'main character energy' coming your way 💫",
    "A new adventure is waiting... check your DMs 🌄",
    "You're about to have an epiphany while scrolling 🧠",
    "The algorithm loves you 💻💖",
];

function generateFortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[randomIndex];
    document.getElementById("fortune-text").innerText = fortune;

    // Optional: Add a little shake effect to the cookie
    const cookieImage = document.getElementById("cookie");
    cookieImage.classList.add("shake");

    // Remove the shake effect after animation ends
    setTimeout(() => {
        cookieImage.classList.remove("shake");
    }, 500);
}
