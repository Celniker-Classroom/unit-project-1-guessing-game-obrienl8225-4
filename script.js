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
    let diff = Math.abs(guess - answer);
let temp = "";


    if (guess > answer) {
        if (diff <= 2) temp = "hot";
        else if (diff <= 5) temp = "warm";
        else temp = "cold";

        document.getElementById("msg").textContent = 
        playerName + " , too high" + temp;
    }
    else if (guess < answer) {
              if (diff <= 2) temp = "hot";
        else if (diff <= 5) temp = "warm";
        else temp = "cold";

        document.getElementById("msg").textContent =
        playerName + " , too low" + temp;
     

    }
    else {
        document.getElementById("msg").textContent = 
        playerName + " , correct";

        document.getElementById("guessBtn").disabled = true

        totalWins++;
        totalGuesses += guessCount;

        scores.push(guessCount);
        scores.sort(function(a,b) {
            return a-b;
        });
    //display wins
    document.getElementById("wins").textContent = totalWins;

    //average score
    let avg = totalGuesses / totalWins;
    document.getElementById("avgScore").textContent = avg.toFixed(0);

    //leaderboard
    
    let list = document.getElementsByName("leaderboard");

    for (let i=0; i < list.length; i++) {
if (scores[i] !== undefined) {
    list[i].textContent = scores[i];
} else {
    list[i].textContent = "--";
}
    }
}
})
