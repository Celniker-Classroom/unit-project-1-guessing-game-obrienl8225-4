// add javascript here
// 
let answer = 0;
let guessCount = 0; 
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

//Player Name
let playerName = prompt("Please enter your name:");
if (playerName === null || playerName.trim() === "") {
    playerName = "Player";
}


//play
//get level
document.getElementById("playBtn").addEventListener("click", function() {

    let radios = document.getElementsByName("level");
    let range = 3; // default
guessCount = 0 
    // get selected level
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }


//round setup
  answer = Math.floor(Math.random() * range) + 1;

    document.getElementById("msg").textContent =
        playerName + ", guess a number between 1 and " + range;

    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

     for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }
})
//guess button 
document.getElementById("guessBtn").addEventListener("click", function() {
    let guess = parseInt(document.getElementById("guess").value);
    guessCount++;

    if (guess > answer) {
        document.getElementById("msg").textContent = 
        playerName + " , too high";
    }
    else if (guess < answer) {
        document.getElementById("msg").textContent =
        playerName + " , too low";

    }
    else {
        document.getElementById("msg").textContent = 
        playerName + " , correct";

        document.getElementById("guessBtn").disabled = true
    }
})