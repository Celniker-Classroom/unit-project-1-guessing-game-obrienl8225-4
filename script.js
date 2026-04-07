// add javascript here
// 
let answer = 0;
let guessCount = 0; 
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

//Player Name
let playerName = prmopt("Please enter your name:");
if (playerName === null || playerName.trim() === "") {
    playerName = "Player";
}

//play
//get level
document.getElement =ById("playBtn").addEventListener
("click" , function() {
    let radios = document.getElementById("level");
    let range = 3;
    for (let i=0; i < radios.length; i++) {
        if (radios[i].checked) {
            range = parseInt(radios[i].value);
        }
    }
});

//round setup
answer= Math.floor(Math.random() * range) + 1;
document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
document.getElementById("guess").value="";
document.getElementById("guessBtn").disabled = false;
document.getElementById("giveUpBtn").disabled= false;
document.getElementById("playBtn").diabled= true;

let levelRadios = document.getElementsByName("level");
for (let i = 0; i< radios.lenth; i++) {
    levelRadios[i].disabled = true;
}

