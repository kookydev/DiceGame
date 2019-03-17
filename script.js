let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll");
let nextButton = document.getElementById("next");
let instructions = document.getElementById("instructions");
let message = document.getElementById("message-box-inner");
let inputBox = document.getElementById("input");
let scoreBoard = document.getElementById("scoreboard-inner");
let scoreNumber = document.getElementById("score-number");
let addPlayerButton = document.getElementById("add-player")
let submitButton = document.getElementById("submit")
let playArea = document.getElementById("play-area")

playButton.addEventListener("click", () => {
  turnHandler()
});
rollDiceButton.addEventListener("click", () => {
  rollDice()
});
addPlayerButton.addEventListener("click", () => {
  console.log("Add a player clicked")
  playerMaker();
});
nextButton.addEventListener("click", () => {
  turnHandler();
})
// submitButton.addEventListener("click", () => {})

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

const gameData = {
  players: [],
  gameCount: 0,
  current: 0,
  bustCount: 0,
  roll: 0,
  face: [
    "./img/dice1.png",
    "./img/dice2.png",
    "./img/dice3.png",
    "./img/dice4.png",
    "./img/dice5.png",
    "./img/dice6.png"
  ],
  newGame: true
}



const turnHandler = () => {
  updateScoreboard()
  if (gameData.newGame) {
    playArea.style.display = "flex";
    gameData.newGame = false;
  }
  if (gameData.bustCount === gameData.players.length) {
    allBustHandler()
  } else if (gameData.players[gameData.current].bust) {
    gameData.current === gameData.players.length - 1 ? gameData.current = 0 : gameData.current++
    turnHandler()
  } else {
    nextButton.style.display = "none"
    console.log(`Currently player ${gameData.current+1}, ${gameData.players[gameData.current].name}`)
    playGame()
  }
}

async function playerMaker() {
  instructions.style.display = "none";
  addPlayerButton.style.display = "none"
  let result = await questionAnswer(`Player, please enter your name:`)
  gameData.players.push(new Player(result));
  updateScoreboard()
  addPlayer();
}

const allBustHandler = () => {
  message.innerText = "Everyone is bust, it's game over! \nDo you want to play again?"
  nextButton.style.display = "none"
  playButton.style.display = "inline";
  resetHandler();
}

const addPlayer = () => {
  message.innerText = "Do you want to add another player?"
  playButton.style.display = "inline"
  addPlayerButton.style.display = "inline"
}

const playGame = () => {
  let current = gameData.current
  scoreNumber.innerText = gameData.players[current].score;
  playButton.style.display = "none";
  addPlayerButton.style.display = "none"
  message.innerText = `${gameData.players[current].name}, click to roll!`;
  rollDiceButton.style.display = "inline";
}
submitButton.removeEventListener("click", () => {})

const rollDice = () => {
  let current = gameData.current
  rollDiceButton.style.display = "none";
  message.innerText = "";
  let img = document.getElementById("dice-face");
  let result = Math.floor(Math.random() * 5);
  gameData.roll = result + 1;
  img.src = `${gameData.face[result]}`;
  img.alt = `${gameData.roll}`;
  gameData.players[current].score += gameData.roll;
  scoreNumber.innerText = gameData.players[current].score;
  updateScoreboard();
  gameData.players[current].lastRoll = gameData.roll;
  rollOutcome();
}


const rollOutcome = () => {
  let current = gameData.current
  if (gameData.roll == 1) {
    message.innerText = `Oh man! It's a 1... \nGame Over, ${gameData.players[current].name} - you're BUST!`;
    gameData.players[current].bust = true;
    gameData.players[current].score = "BUST!";
    gameData.players[current].losses++
    gameData.bustCount++
    gameData.current === gameData.players.length - 1 ? gameData.current = 0 : gameData.current++
    nextButton.style.display = "inline";

  } else {
    if (gameData.players[current].score >= 20) {
      message.innerText = `${gameData.players[gameData.current].name} wins!!\nDo you want to play again?`;
      gameData.players[current].wins++

      resetHandler();
      playButton.style.display = "inline";

    } else {
      message.innerText = `${gameData.players[current].name}, you rolled ${gameData.players[current].lastRoll} - next player's turn`;
      gameData.current === gameData.players.length - 1 ? gameData.current = 0 : gameData.current++
      nextButton.style.display = "inline";

    }
  }
}

const resetHandler = () => {
  gameData.gameCount++
  gameData.bustCount = 0
  gameData.current = 0
  for (let i = 0; i < gameData.players.length; i++) {
    gameData.players[i].lastRoll = 0;
    gameData.players[i].score = 0;
    gameData.players[i].bust = false;
  }
}

const questionAnswer = (msg, type) => {
  submitButton.removeEventListener("click", () => {})
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
  })
};

const updateScoreboard = () => {
  let scoreBoardString = ""
  let i = 1;
  gameData.players.map((player, index) => {
    scoreBoardString += `<div class="${player.bust && "scoreboard-bust"}" id="player${index}">${
      player.name
    }</div><div class="${player.bust && "scoreboard-bust"}" id="player${index}roll">${
      player.lastRoll
    }</div><div class="${player.bust && "scoreboard-bust"}" id="player${index}score">${
      player.score
    }</div><div class="${player.bust && "scoreboard-bust"}" id="player${index}wins">${
      player.wins
    }</div><div class="${player.bust && "scoreboard-bust"}" id="player${index}losses">${player.losses}</div>`
  })
  scoreBoard.innerHTML = scoreBoardString;
  return
}








// rollDiceButton.addEventListener("click", turnController);

// `<div>${players[i].name}</div><div>${players[i].roll}</div><div>${players[i].score}</div>`


// function resetter() {
//   playButton.style.display = "inline";
//   playButton.addEventListener("click", () => {
//     for (let p = 0; p < gameData.players.length; p++) {
//       players.lastRoll = 0;
//       players.score = 0;
//       players.bust = false;
//       document.getElementById(`player${p}score`).innerText = players.score;
//       document.getElementById(`player${p}roll`).innerText = players.lastRoll;
//     }
//     playButton.style.display = "none";
//     bustNumber = 0;
//     i = 0;
//     playGame();

//   });
// }



// async function playGame() {
//   console.log(i);
//   console.log(players.length);
//   if (i < players.length) {
//     await playerTurn();
//   } else {
//     i = 0;
//     playGame();;
//   }
// }

// function playerTurn() {
//   if (!players[i].bust) {
//     message.innerText = `You're up, ${players[i].name}, Roll that die!`;
//     rollDiceButton.style.display = "inline";
//     rollDiceButton.addEventListener("click", () => {
//       rollDiceButton.style.display = "none";
//       message.innerText = "";
//       rollDice();
//     });
//   } else {
//     i++
//     playGame();
//   }
// }

// function rollDice() {
//   let img = document.getElementById("dice-face");
//   let result = Math.floor(Math.random() * 5);
//   roll = result + 1;
//   players[i].score += roll;
//   players[i].lastRoll = roll;
//   img.src = `${face[result]}`;
//   img.alt = `${roll}`;
//   scoreNumber.innerText = players[i].score;
//   document.getElementById(`player${i}roll`).innerText = players[i].lastRoll;
//   document.getElementById(`player${i}score`).innerText = players[i].score;
//   rollOutcome();
// }

// function rollOutcome() {
//   console.log(`score is ${players[i].score}`);
//   if (roll == 1) {
//     message.innerText = `Oh man! It's a 1... \nGame Over ${
//       players[i].name
//     } - you're BUST!`;
//     players[i].bust = true;
//     document.getElementById(`player${i}score`).innerText = "BUST!";
//     document.getElementById(`player${i}score`).style.color = "red";
//     players[i].losses++;
//     bustNumber++;
//     nextButton.style.display = "inline";
//     rollDiceButton.style.display = "none";
//     nextButton.addEventListener("click", () => {
//       nextButton.style.display = "none";
//       i++;
//       playGame();
//     });
//   } else {
//     if (players[i].score >= 20) {
//       message.innerText = `${players[i].name} - YOU WIN!!`;
//       players[i].wins++;
//       document.getElementById;
//       nextButton.style.display = "inline";
//       rollDiceButton.style.display = "none";
//       nextButton.addEventListener("click", () => {
//         nextButton.style.display = "none";
//         resetter();
//       });
//     } else {
//       message.innerText = `Keep going ${players[i].name}, your score is ${players[i].score}`;
//       nextButton.style.display = "inline";
//       nextButton.addEventListener("click", () => {
//         nextButton.style.display = "none";
//         i++;
//         playGame();
//       });
//     }
//   }
// }