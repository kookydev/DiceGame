let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll");
let nextButton = document.getElementById("next");
let submitButton = document.getElementById("submit");
let instructions = document.getElementById("instructions");
let message = document.getElementById("message-box-inner");
let inputBox = document.getElementById("input");
let scoreBoard = document.getElementById("scoreboard-inner");
let scoreNumber = document.getElementById("score-number");

let players = [];
let playerInput = "";
// let gameCount = 0;
let roll = 0;
let face = [
  "./img/dice1.png",
  "./img/dice2.png",
  "./img/dice3.png",
  "./img/dice4.png",
  "./img/dice5.png",
  "./img/dice6.png"
];
let timeout = 0;
let scoreBoardString = "";
let i = 0;
let bustNumber = 0;

const handleFirstTab = e => {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
};

window.addEventListener("keydown", handleFirstTab);

function resetter() {
  playButton.style.display = "inline";
  playButton.addEventListener("click", () => {
    for (let p = 0; p < players.length; p++) {
      players.lastRoll = 0;
      players.score = 0;
      players.bust = false;
      document.getElementById(`player${p}score`).innerText = players.score;
      document.getElementById(`player${p}roll`).innerText = players.lastRoll;
    }
    playButton.style.display = "none";
    bustNumber = 0;
    i = 0;
    playGame();
    
  });
}

let iterator = () => {
    i++
    if (i<playerInput.length) {
        playGame();
    }
    else {
        i=0;
        playGame();
    }
}

function playGame() {
    console.log(i);
    console.log(players.length);
    playerTurn();
}

function playerTurn() {
  if (!players[i].bust) {
    message.innerText = `You're up, ${players[i].name}, Roll that die!`;
    rollDiceButton.style.display = "inline";
    rollDiceButton.addEventListener("click", () => {
      rollDiceButton.style.display = "none";
      message.innerText = "";
      rollDice();
    }, false);
  } else {
    iterator();
  }
}

function rollDice() {
  let img = document.getElementById("dice-face");
  let result = Math.floor(Math.random() * 5);
  roll = result + 1;
  players[i].score += roll;
  players[i].lastRoll = roll;
  img.src = `${face[result]}`;
  img.alt = `${roll}`;
  scoreNumber.innerText = players[i].score;
  document.getElementById(`player${i}roll`).innerText = players[i].lastRoll;
  document.getElementById(`player${i}score`).innerText = players[i].score;
  console.log(`score is ${players[i].score}`);
  rollOutcome();
}

function rollOutcome() {
  console.log(`score is ${players[i].score}`);
  if (roll == 1) {
    message.innerText = `Oh man! It's a 1... \nGame Over ${
      players[i].name
    } - you're BUST!`;
    players[i].bust = true;
    document.getElementById(`player${i}score`).innerText = "BUST!";
    document.getElementById(`player${i}score`).style.color = "red";
    players[i].losses++;
    bustNumber++;
    nextButton.style.display = "inline";
    rollDiceButton.style.display = "none";
    nextButton.addEventListener("click", () => {
      nextButton.style.display = "none";
      iterator();
    });
  } else {
    if (players[i].score >= 20) {
      message.innerText = `${players[i].name} - YOU WIN!!`;
      players[i].wins++;
      document.getElementById;
      nextButton.style.display = "inline";
      rollDiceButton.style.display = "none";
      nextButton.addEventListener("click", () => {
        nextButton.style.display = "none";
        resetter();
      });
    } else {
      message.innerText = `Keep going ${players[i].name}, your score is ${players[i].score}`;
      nextButton.style.display = "inline";
      nextButton.addEventListener("click", () => {
        nextButton.style.display = "none";
        iterator();
      });
    }
  }
}

const questionAnswer = (msg, type) => {
  // msg = message string. type = set to 1 for integer, defaults to string
  message.innerText = msg;
  playButton.style.display = "none";
  inputBox.value = "";
  inputBox.style.display = "inline";
  submitButton.style.display = "inline";
  return new Promise((resolve, reject, response) => {
    submitButton.addEventListener("click", () => {
      if (type == 1) {
        response = parseInt(inputBox.value);
      } else {
        response = inputBox.value;
        console.log(response);
      }
      inputBox.style.display = "none";
      submitButton.style.display = "none";
      message.innerText = "";
      resolve(response);
    });
  });
};

const initialise = () => {
  instructions.style.display = "none";
  questionAnswer("How many people are playing?", 1).then(result => {
    playerMaker(result);
  });
};

async function playerMaker(numPlayers) {
  if (numPlayers > 0) {
    for (let i = 0; i < numPlayers; i++) {
      let n = i + 1;
      await questionAnswer(`Player ${n}, please enter your name:`)
        .then(result => {
          players.push(new Player(result));
        })
        .then(() => {
          scoreBoardString += `<div id="player${i}name">${
            players[i].name
          }</div><div id="player${i}roll">${
            players[i].lastRoll
          }</div><div id="player${i}score">${
            players[i].score
          }</div><div id="player${i}wins">${
            players[i].wins
          }</div><div id="player${i}losses">${players[i].losses}</div>`;
        });
    }
    scoreBoard.innerHTML = scoreBoardString;
  } else if (numberOfPlayers == NaN) {
    message.innerText = "That wasn't a number, try again.";
    setTimeout(initialise(), 3000);
  } else {
    message.innerText = "No-one can't play a game... or something like that.";
    setTimeout(initialise(), 3000);
  }
  iterator();
}

class Player {
  constructor(name) {
    this.name = name;
    this.lastRoll = 0;
    this.score = 0;
    this.bust = false;
    this.wins = 0;
    this.losses = 0;
  }
}

playButton.addEventListener("click", function() {
  initialise();
});

// rollDiceButton.addEventListener("click", turnController);

// `<div>${players[i].name}</div><div>${players[i].roll}</div><div>${players[i].score}</div>`
