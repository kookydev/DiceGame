let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll");
let rollDiceAgain = document.getElementById("roll");
let nextButton = document.getElementById("next");
let submitButton = document.getElementById("submit");
let instructions = document.getElementById("instructions");
let message = document.getElementById("message-box-inner");
let scoreNumber = document.getElementById("score-number");

let gameInProgress = false;
let roll = 0;
let score = 0;
let face = [
  "./img/dice1.png",
  "./img/dice2.png",
  "./img/dice3.png",
  "./img/dice4.png",
  "./img/dice5.png",
  "./img/dice6.png"
];

playButton.addEventListener("click", function () {
  playGame()
});
rollDiceButton.addEventListener("click", function () {
  rollDice()
});

const playGame = () => {
  score = 0;
  scoreNumber.innerText = score;
  instructions.style.display = "none";
  playButton.style.display = "none";
  message.innerText = `Click to roll that die!`;
  rollDiceButton.style.display = "inline";
}


const rollDice = () => {
  rollDiceButton.style.display = "none";
  message.innerText = "";
  let img = document.getElementById("dice-face");
  let result = Math.floor(Math.random() * 5);
  roll = result + 1;
  img.src = `${face[result]}`;
  img.alt = `${roll}`;
  score += roll;
  scoreNumber.innerText = score;
  rollOutcome();
}


function rollOutcome() {
  debugger;
  console.log(`score is ${score}`);
  if (roll == 1) {
    message.innerText = `Oh man! It's a 1... \nGame Over - you're BUST!\n Click to play again.`;
    playButton.style.display = "inline";

  } else {
    if (score >= 20) {
      message.innerText = `YOU WIN!!\nClick below to play again`;
      playButton.style.display = "inline";

    } else {
      message.innerText = `You rolled ${roll} - click to roll again`;
      rollDiceButton.style.display = "inline";
    }
  }
}