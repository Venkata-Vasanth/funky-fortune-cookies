// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to generate and display the fortune
function generateFortune() {
    const todayDate = new Date().toDateString(); // Unique identifier for today
    const storedFortuneDate = getCookie("fortuneDate");
    let fortune;

    if (storedFortuneDate === todayDate) {
        // Use the stored fortune
        fortune = getCookie("fortune");
    } else {
        // Generate a new fortune
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        fortune = fortunes[randomIndex];
        setCookie("fortune", fortune, 1);
        setCookie("fortuneDate", todayDate, 1);
    }

    // Display the fortune
    document.getElementById("fortune-text").innerText = fortune;

    // Shake effect
    const cookieImage = document.getElementById("cookie");
    cookieImage.classList.add("shake");
    setTimeout(() => {
        cookieImage.classList.remove("shake");
    }, 500);
}

// Function to generate and display the challenge
function generateChallenge() {
    const todayDate = new Date().toDateString(); // Unique identifier for today
    const storedChallengeDate = getCookie("challengeDate");
    let challenge;

    if (storedChallengeDate === todayDate) {
        // Use the stored challenge
        challenge = getCookie("challenge");
    } else {
        // Generate a new challenge
        const randomIndex = Math.floor(Math.random() * challenges.length);
        challenge = challenges[randomIndex];
        setCookie("challenge", challenge, 1);
        setCookie("challengeDate", todayDate, 1);
    }

    // Display the challenge
    document.getElementById("challenge-text").innerText = challenge;
}

// Function to handle button click and reveal fortune and challenge
function showFortune() {
    const fortuneText = document.getElementById("fortune-text");
    if (fortuneText.innerText === "") {
        generateFortune(); // Generate and display the fortune
        generateChallenge(); // Generate and display the challenge
    }
}

// Initial setup: Hide fortune and challenge text on page load
window.onload = () => {
    document.getElementById("fortune-text").innerText = "";
    document.getElementById("challenge-text").innerText = "";
};
