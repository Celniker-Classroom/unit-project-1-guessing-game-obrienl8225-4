// Dark Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        html.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
        const isDarkMode = themeToggle.checked;
        if (isDarkMode) {
            html.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize theme on page load
initThemeToggle();

// add javascript here

let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGames = 0;
let totalGuesses = 0;
let scores = [];

let startTime = 0;
let times = [];

// player name
let playerName = prompt("Please enter your name:");
if (playerName === null || playerName.trim() === "") {
    playerName = "Player";
} else {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
}

// Function to get day suffix (st, nd, rd, th)
function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Function to update date and time every second
function updateDateTime() {
    let now = new Date();
    
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let month = monthNames[now.getMonth()];
    let day = now.getDate();
    let year = now.getFullYear();
    let suffix = getDaySuffix(day);
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    
    let dateString = month + " " + day + suffix + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
    document.getElementById("date").textContent = dateString;
}

// Initial date update
updateDateTime();

// Update date every second
setInterval(updateDateTime, 1000);

// Fireworks function
function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('span');
        firework.className = 'firework';
        firework.style.left = '50%';
        firework.style.top = '50%';
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 8 + Math.random() * 4;
        const tx = Math.cos(angle) * velocity * 50;
        const ty = Math.sin(angle) * velocity * 50;
        
        firework.style.setProperty('--tx', tx + 'px');
        firework.style.setProperty('--ty', ty + 'px');
        
        fireworksContainer.appendChild(firework);
    }

    setTimeout(() => {
        fireworksContainer.remove();
    }, 1000);
}

// timer function
function updateTimers() {

    let endTime = new Date().getTime();
    let elapsed = (endTime - startTime) / 1000;

    times.push(elapsed);

    let fastest = Math.min(...times);

    let sum = 0;
    for (let i = 0; i < times.length; i++) {
        sum += times[i];
    }

    let avgTime = sum / times.length;

    document.getElementById("fastest").textContent = fastest.toFixed(2);
    document.getElementById("avgTime").textContent = avgTime.toFixed(2);
}

// Function to update win percentage
function updateWinPercentage() {
    if (totalGames > 0) {
        const percentage = (totalWins / totalGames) * 100;
        document.getElementById("winPercentage").textContent = "Win Percentage: " + percentage.toFixed(1) + "%";
    }
}

// play
document.getElementById("playBtn").addEventListener("click", function() {

    let radios = document.getElementsByName("level");
    let range = 3;

    guessCount = 0;
    totalGames++;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
        radios[i].disabled = true;
    }

    answer = Math.floor(Math.random() * range) + 1;

    startTime = new Date().getTime();

    document.getElementById("msg").textContent =
        playerName + ", guess a number between 1 and " + range;

    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
});

// guess
document.getElementById("guessBtn").addEventListener("click", function() {

    let guess = parseInt(document.getElementById("guess").value);
    guessCount++;

    let diff = Math.abs(guess - answer);
    let temp = "";

    if (diff <= 2) temp = "hot";
    else if (diff <= 5) temp = "warm";
    else temp = "cold";

    if (guess > answer) {

        document.getElementById("msg").textContent =
            playerName + ", too high " + temp;

    } else if (guess < answer) {

        document.getElementById("msg").textContent =
            playerName + ", too low " + temp;

    } else {

        createFireworks();

        document.getElementById("msg").textContent =
            playerName + ", correct";

        document.getElementById("guessBtn").disabled = true;

        totalWins++;
        totalGuesses += guessCount;

        scores.push(guessCount);
        scores.sort(function(a, b) {
            return a - b;
        });

        document.getElementById("wins").textContent = "Total wins: " + totalWins;
        updateWinPercentage();

        let avgScore = totalGuesses / totalWins;
        document.getElementById("avgScore").textContent = "Average Score: " + avgScore.toFixed(0);

        let list = document.getElementsByName("leaderboard");

        for (let i = 0; i < list.length; i++) {
            if (scores[i] !== undefined) {
                list[i].textContent = scores[i];
            } else {
                list[i].textContent = "--";
            }
        }

        document.getElementById("giveUpBtn").disabled = true;
        document.getElementById("playBtn").disabled = false;
        
        // Re-enable all radio buttons for next round
        let radios = document.getElementsByName("level");
        for (let i = 0; i < radios.length; i++) {
            radios[i].disabled = false;
        }

        updateTimers();
    }
});

// give up
document.getElementById("giveUpBtn").addEventListener("click", function() {

    let radios = document.getElementsByName("level");
    let range = 3;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }

    document.getElementById("msg").textContent =
        playerName + ", you gave up";

    totalWins++;
    totalGuesses += range;

    scores.push(range);
    scores.sort(function(a, b) {
        return a - b;
    });

    document.getElementById("wins").textContent = "Total wins: " + totalWins;

    let avgScore = totalGuesses / totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + avgScore.toFixed(0);

    let list = document.getElementsByName("leaderboard");

    for (let i = 0; i < list.length; i++) {
        if (scores[i] !== undefined) {
            list[i].textContent = scores[i];
        } else {
            list[i].textContent = "--";
        }
    }

    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    
    // Re-enable all radio buttons for next round
    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = false;
    }
    
    updateTimers();
});