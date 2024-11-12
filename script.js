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

function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let streak = parseInt(localStorage.getItem('streak') || '0', 10);

    if (lastVisit !== today) {
        if (new Date(lastVisit).getTime() + 86400000 >= new Date().getTime()) {
            streak++;
        } else {
            streak = 1; // Reset streak if more than a day passed
        }
        localStorage.setItem('streak', streak);
    }

    localStorage.setItem('lastVisit', today);
    document.getElementById('streak-display').innerText = `Your Streak: ${streak} days`;
}

// Call updateStreak on page load
document.addEventListener("DOMContentLoaded", updateStreak);

document.getElementById('share-button').addEventListener('click', () => {
    const fortuneText = document.getElementById('fortune-text').innerText;

    if (navigator.share) {
        navigator.share({
            title: 'Check out my fortune!',
            text: fortuneText,
            url: window.location.href,
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(fortuneText)
            .then(() => alert('Fortune copied to clipboard!'))
            .catch(console.error);
    }
});

document.getElementById('theme-selector').addEventListener('change', function () {
    const theme = this.value;
    const body = document.body;

    // Define background colors for each theme
    const themeColors = {
        general: '#cce7ff',      // Light blue (modern and calming, Gen Z-friendly)
        love: '#f8b0b0',         // Soft blush pink (more lively)
        career: '#a7c8ff',       // Light sky blue (calming and professional)
        motivation: '#b3f0b3',   // Mint green (refreshing and energizing)
        creativity: '#f0c9ff',   // Soft lavender (inspiring and artistic)
        relaxation: '#e2f7f4',   // Soft teal (calming and peaceful)
        focus: '#fffae1',        // Soft yellow (uplifting and motivating)
        wellness: '#e0ffd5',     // Light lime green (fresh and healthy)
        adventure: '#ffcc99',    // Warm coral (exciting and dynamic)
        positivity: '#ffed8b',   // Sunshine yellow (bright and optimistic)
    };



    // Apply the selected theme's background color
    body.style.backgroundColor = themeColors[theme];
});

document.addEventListener("DOMContentLoaded", function () {
    // Get fortune text element
    const fortuneTextElement = document.getElementById("fortune-text");

    // Reaction buttons
    const likeButton = document.getElementById("like-button");
    const saveButton = document.getElementById("save-button");

    // Reaction to Like Button
    likeButton.addEventListener("click", function () {
        const fortuneText = fortuneTextElement.innerText;
        let likedFortunes = JSON.parse(localStorage.getItem("likedFortunes")) || [];
        
        // Check if the fortune is already liked
        if (!likedFortunes.includes(fortuneText)) {
            likedFortunes.push(fortuneText); // Add fortune to liked list
            localStorage.setItem("likedFortunes", JSON.stringify(likedFortunes)); // Save to localStorage
            alert("Fortune liked!");
        } else {
            alert("You've already liked this fortune!");
        }
    });

    // Reaction to Save Button
    saveButton.addEventListener("click", function () {
        const fortuneText = fortuneTextElement.innerText;
        let savedFortunes = JSON.parse(localStorage.getItem("savedFortunes")) || [];
        
        // Check if the fortune is already saved
        if (!savedFortunes.includes(fortuneText)) {
            savedFortunes.push(fortuneText); // Add fortune to saved list
            localStorage.setItem("savedFortunes", JSON.stringify(savedFortunes)); // Save to localStorage
            updateSavedFortunes(); // Update the saved fortunes list
            alert("Fortune saved!");
        } else {
            alert("You've already saved this fortune!");
        }
    });

    // Function to load saved fortunes from localStorage and display them
    function updateSavedFortunes() {
        const savedList = document.getElementById("saved-list");
        let savedFortunes = JSON.parse(localStorage.getItem("savedFortunes")) || [];
        
        savedList.innerHTML = ''; // Clear current list
        savedFortunes.forEach(fortune => {
            const li = document.createElement("li");
            li.innerText = fortune;
            savedList.appendChild(li);
        });
    }

    // Load saved fortunes when the page loads
    updateSavedFortunes();
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the audio elements by their ID
    const clickSound = document.getElementById("click-sound");
    const cookieSound = document.getElementById("cookie-sound");
    const backgroundMusic = document.getElementById("background-music");

    // Start background music on page load
    backgroundMusic.play();

    // Function to play the click sound effect when a button is clicked
    const playClickSound = () => {
        clickSound.currentTime = 0;  // Reset audio to the beginning
        clickSound.play();           // Play the sound
    };

    // Function to play the cookie sound when the fortune is generated
    const playCookieSound = () => {
        cookieSound.currentTime = 0; // Reset audio to the beginning
        cookieSound.play();          // Play the sound
    };

    // Attach event listeners to buttons
    document.getElementById("like-button").addEventListener("click", () => {
        playClickSound(); // Play click sound on "Like" button click
    });

    document.getElementById("save-button").addEventListener("click", () => {
        playClickSound(); // Play click sound on "Save" button click
    });

    document.getElementById("fortune-cookie").addEventListener("click", () => {
        playCookieSound(); // Play cookie sound when fortune cookie is clicked
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Points storage in localStorage
    const pointsKey = "userPoints";
    const streakKey = "userStreak";
    const lastLoginKey = "lastLogin";

    let points = JSON.parse(localStorage.getItem(pointsKey)) || 0;
    let streak = JSON.parse(localStorage.getItem(streakKey)) || 0;
    let lastLogin = JSON.parse(localStorage.getItem(lastLoginKey)) || new Date().toLocaleDateString();

    // Elements
    const pointsDisplay = document.getElementById("points-count");
    const fortuneTextElement = document.getElementById("fortune-text");
    const likeButton = document.getElementById("like-button");
    const saveButton = document.getElementById("save-button");
    const streakTextElement = document.getElementById("streak-text");

    // Update Points Display
    function updatePointsDisplay() {
        pointsDisplay.innerText = points;
    }

    // Reward points for actions
    function rewardPoints(action) {
        let reward = 0;
        switch (action) {
            case 'like':
                reward = 10; // 10 points for liking a fortune
                break;
            case 'save':
                reward = 20; // 20 points for saving a fortune
                break;
            case 'streak':
                reward = 50; // 50 points for maintaining a streak
                break;
            default:
                reward = 0;
        }
        points += reward;
        localStorage.setItem(pointsKey, JSON.stringify(points)); // Save to localStorage
        updatePointsDisplay();
    }

    // Track streaks
    function trackStreak() {
        const currentDate = new Date().toLocaleDateString();
        if (currentDate !== lastLogin) {
            // New day, check if it's a streak
            if (new Date(currentDate) - new Date(lastLogin) === 86400000) {
                streak += 1; // Increment streak if they came back the next day
                rewardPoints('streak');
            } else {
                streak = 1; // Reset streak if not consecutive days
            }
            lastLogin = currentDate;
            localStorage.setItem(lastLoginKey, JSON.stringify(lastLogin)); // Save last login date
            localStorage.setItem(streakKey, JSON.stringify(streak)); // Save streak count
        }
        streakTextElement.innerText = `Your Streak: ${streak} day(s)`;
    }

    // Add Event Listeners to Like and Save Buttons
    likeButton.addEventListener("click", function () {
        rewardPoints('like');
        alert("You earned 10 points for liking a fortune!");
    });

    saveButton.addEventListener("click", function () {
        rewardPoints('save');
        alert("You earned 20 points for saving a fortune!");
    });

    // Check streak on page load
    trackStreak();
});
