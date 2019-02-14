let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll")


class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.scoreTracker = [];
        this.games = 0;
        this.roll = 0;
        this.face = ["./img/dice1.png", "./img/dice2.png", "./img/dice3.png", "./img/dice4.png", "./img/dice5.png", "./img/dice6.png"];
        this.timeout = 0;
    }

    play() {
        this.rollDice();
        setTimeout(() => console.log(this.showResult()), this.timeout);
    }

    rollDice() {
        let counter = 1;
        const animateDice = () => {
            console.log(`Roll number ${counter}`);
            let result = Math.floor(Math.random() * Math.floor(6));
            this.showFace(result);
            counter++;
            this.roll = result + 1;
        };        
        let rollTimes = Math.floor(Math.random() * Math.floor(20));
        console.log(`Rolltimes: ${rollTimes}`)
        let interval = 150;
        this.timeout = rollTimes * interval;        
        var animInterval = setInterval(() => animateDice(), interval);
        setTimeout(() => {clearInterval(animInterval);}, this.timeout);
    }

    showFace(result) {
        let num = result + 1;
        console.log(num);
        let img = document.getElementById("dice-face");
        img.src = `${this.face[result]}`;
        img.alt = `${num}`;
    }

    showResult() {
        this.score += this.roll
        if(this.roll == 1) {
            return(`You rolled a 1 - GAME OVER!`);
        }
        else {
            if (this.score>=20) {
                return(`CONGRATULATIONS! Your score is ${this.score} or over - YOU WIN!`)
            }
            else {
                return(`Your score is ${this.score}, roll again!`)
            }
        } 
    }

    

}

let playerInput = [];
let players = [];

const startGame = () => {
    for(i=0; i<playerInput.length; i++) {
        let name = playerInput[i];
        players.push(new Player(name));
    }
    let scoreBoard = document.getElementById("scoreboard-inner");
    console.log(players);
    for(i=0; i<players.length; i++) {
        scoreBoard.innerHTML = `<div>${players[i].name}</div><div>${players[i].roll}</div><div>${players[i].score}</div>`
    }
    
}

const initialise = () => {
    var response = prompt(`Current players are:\n\n${playerInput}\n\nDo you want to add any more? (y/n)`);
    if (response == "y" || response == "n") {
        if (response == "y") {
                playerInput.push([prompt(`What's your name?`),]);
                console.log(playerInput);
                initialise();
        }
        else {
            if(playerInput.length>0) {
                startGame();
            }
            else {
                alert(`You can't play a game with no players! Goodbye!`)
            }
        }
    }
    else {
        alert(`${response} is not a valid response, please try again.`);
        initialise();
    }
}

scoreLine = () => {
    return(``)
}
playButton.addEventListener("click", initialise);
// rollDiceButton.addEventListener("click", turnController);











