// add javascript here

let answer = 0;
let guessCount = 0;
let totalWins = 0;
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

// play
document.getElementById("playBtn").addEventListener("click", function() {

    let radios = document.getElementsByName("level");
    let range = 3;

    guessCount = 0;

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

        document.getElementById("msg").textContent =
            playerName + ", correct";

        document.getElementById("guessBtn").disabled = true;

        totalWins++;
        totalGuesses += guessCount;

        scores.push(guessCount);
        scores.sort(function(a, b) {
            return a - b;
        });

        document.getElementById("wins").textContent = totalWins;

        let avg = totalGuesses / totalWins;
        document.getElementById("avgScore").textContent = avg.toFixed(0);

        let list = document.getElementsByName("leaderboard");

        for (let i = 0; i < list.length; i++) {
            if (scores[i] !== undefined) {
                list[i].textContent = scores[i];
            } else {
                list[i].textContent = "--";
            }
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

    guessCount = range;

    totalWins++;
    totalGuesses += guessCount;

    scores.push(range);
    scores.sort(function(a, b) {
        return a - b;
    });

    document.getElementById("wins").textContent = totalWins;

    let avg = totalGuesses / totalWins;
    document.getElementById("avgScore").textContent = avg.toFixed(0);

    let list = document.getElementsByName("leaderboard");

    for (let i = 0; i < list.length; i++) {
        if (scores[i] !== undefined) {
            list[i].textContent = scores[i];
        } else {
            list[i].textContent = "--";
        }
    }

    document.getElementById("guessBtn").disabled = true;
    updateTimers();
});