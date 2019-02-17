let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll");
let nextButton = document.getElementById("next");
let submitButton = document.getElementById("submit");
let instructions = document.getElementById("instructions");
let message = document.getElementById("message-box-inner");
let inputBox = document.getElementById("input");
let scoreBoardString = "";
let scoreBoard = document.getElementById("scoreboard-inner");


function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);

class Game {
    constructor(message) {
        this.players = [];
        this.playerInput = "";
        // this.numberOfPlayers = 0;
        this.gameCount = 0;
        this.roll = 0;
        this.face = ["./img/dice1.png", "./img/dice2.png", "./img/dice3.png", "./img/dice4.png", "./img/dice5.png", "./img/dice6.png"];
        this.timeout = 0;
        this.message = message;
    }

    async play() {
        this.rollDice();
        setTimeout(() => console.log(this.showResult()), this.timeout);
    }

    rollPrompt() {

    }

    async rollDice() {
        let counter = 1;
        const animateDice = (roll) => {
            console.log(`Roll number ${counter}`);
            let result = Math.floor(Math.random()*6);
            this.showFace(result);
            counter++;
            this.roll = result + 1;
        };
        let rollTimes = Math.floor(Math.random() * Math.floor(20));
        console.log(`Rolltimes: ${rollTimes}`)
        let interval = 150;
        this.timeout = rollTimes * interval;
        var animInterval = setInterval(() => animateDice(), interval);
        setTimeout(() => {
            clearInterval(animInterval);
        }, this.timeout);
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
        if (this.roll == 1) {
            return (`You rolled a 1 - GAME OVER!`);
        } else {
            if (this.score >= 20) {
                return (`CONGRATULATIONS! Your score is ${this.score} or over - YOU WIN!`)
            } else {
                return (`Your score is ${this.score}, roll again!`)
            }
        }
    }

    async gameProgress() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].bust == false && this.players[i].score < 21) {
                await this.prompter(`You're up, ${this.players[i].name}, Roll that die!`, rollDiceButton, this.rollDice());
                if (this.roll == 1){
                    message.innerText = `Oh man! It's a 1... \nGame Over ${this.players[i].name} - you're BUST!`
                    this.players[i].bust = true;
            }
                else {
                    this.players[i].score += this.roll;
                    if (this.players[i].score >= 20) {
                        message.innerText = `${this.players[i].name} - YOU WIN!!`
                        this.players[i].wins++
                    } else {
                        message.innerText = `Keep going ${this.players[i].name}, your score is ${this.players[i].score}`

                    }
                }
            }
        }    
    }

    questionAnswer(msg, type) { // msg = message string. type = set to 1 for integer, defaults to string
        message.innerText = msg;
        playButton.style.display = "none"
        inputBox.value = "";
        inputBox.style.display = "inline";
        submitButton.style.display = "inline";
        return new Promise((resolve,reject, response) =>{
            submitButton.addEventListener("click", () => {
                if (type == 1) {
                    response = parseInt(inputBox.value)}
                else {                
                    response = inputBox.value
                    console.log(response);
                };
                inputBox.style.display = "none";
                submitButton.style.display = "none";
                message.innerText = "";
                resolve(response);
        })});
    }

    async prompter(msg, thisButton, runFunc) { // msg = message string button - button to display, read etc... runFunc = function to run
        message.innerText = msg;
        playButton.style.display = "none"
        submitButton.style.display = "none";
        rollDiceButton.style.display = "none";
        nextButton.style.display = "none";
        thisButton.style.display = "inline";
        await thisButton.addEventListener("click", () => {
            inputBox.style.display = "none";
            thisButton.style.display = "none";
            message.innerText = "";
            runFunc;
        });
    };
    

    initialise() {
        instructions.style.display = "none";
        this.questionAnswer("How many people are playing?", 1).then((result)=>{this.playerMaker(result)});
    }

    

    async playerMaker(numPlayers) {
        if (numPlayers > 0) {
            for (let i = 0; i < numPlayers; i++) {
                let n = i + 1;
                await this.questionAnswer(`Player ${n}, please enter your name:`).then((result) => {this.players.push(new Player(result))}).then(() => {scoreBoardString += `<div id="player${i}name">${this.players[i].name}</div><div id="player${i}roll">${this.players[i].lastRoll}</div><div id="player${i}score">${this.players[i].score}</div>`});};
                console.log(this.players);
                console.log(scoreBoardString)
                scoreBoard.innerHTML = scoreBoardString;
        }
        else if (this.numberOfPlayers == NaN) {
            message.innerText = "That wasn't a number, try again.";
            setTimeout(this.initialise(), 3000);
        } else {
            message.innerText = "No-one can't play a game... or something like that.";
            setTimeout(this.initialise(), 3000);
        }

        this.gameProgress();

    }


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



playButton.addEventListener("click", function () {
    new Game().initialise();
});

// rollDiceButton.addEventListener("click", turnController);












// `<div>${players[i].name}</div><div>${players[i].roll}</div><div>${players[i].score}</div>`