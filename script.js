let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll");
let submitButton = document.getElementById("submit");
let message = document.getElementById("message-box-inner");
let inputVal = document.getElementById("input").value;
let inputBox = document.getElementById("input");

function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);

class Game {
    constructor(rollDiceButton, submitButton, message, inputVal, inputBox) {
        this.players = [];
        this.playerInput = "";
        this.gameCount = 0;
        this.roll = 0;
        this.face = ["./img/dice1.png".innerText, "./img/dice2.png", "./img/dice3.png", "./img/dice4.png", "./img/dice5.png", "./img/dice6.png"];
        this.timeout = 0;
        this.rollDiceButton = rollDiceButton;
        this.submitButton = submitButton;
        this.message = message;
        this.inputVal = inputVal;
        this.inputBox = inputBox;
    }

    play() {
        this.rollDice();
        setTimeout(() => console.log(this.showResult()), this.timeout);
    }

    rollDice() {
        let counter = 1;
        const animateDice = () => {
            console.log(`Roll numbenputVal = "";r ${counter}`);
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

    gameProgress() {
        for(let i=0; i<this.players.length; i++) {
            if (this.players[i].bust == false && this.players[i].score < 21) {

            }
        }
        
        
    }

    questionAnswer(msg) {
        message.innerText = msg;
        playButton.style.display = "none"
        inputVal = "";
        inputBox.style.display = "inline";
        submitButton.style.display = "inline";
        submitButton.addEventListener("click", () => {
            console.log(inputVal);
            let response = parseInt(inputBox.value);
            inputBox.style.display = "none";
            submitButton.style.display = "none";
            message.innerText = "";
            return(response);
        });
        
    }
    
    initialise() {
        let numberOfPlayers = this.questionAnswer("How many people are playing?");
        
        
        if(numberOfPlayers>0) {
            this.playerInput(numberOfPlayers);
        }
        else if (numberOfPlayers == NaN) {
            numberOfPlayers = this.questionAnswer("That wasn't a number, try again.");
        }
        else {
            message.innerText = "No-one can't play a game... or something like that."
        }
    }

    playerInput(n) {
        for (let i=0; i<n; i++) {
            this.players.push(new Player(this.questionAnswer(`Player${i+1}Please enter your name:`)));
        }
    }
    
    // scoreBoardUpdater() {
    //     let scoreBoard = document.getElementById("scoreboard-inner");
    //     console.log(players);
    //     for(i=0; i<players.length; i++) {
    //         scoreBoard.insertAdjacentHTML("beforeend", `<div>Dave</div><div>5</div><div>6</div>`)
    //     }
    // }

}

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.bust = false;
        this.wins = 0;
        this.losses = 0;
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



playButton.addEventListener("click", function () {new Game().initialise()});

// rollDiceButton.addEventListener("click", turnController);












// `<div>${players[i].name}</div><div>${players[i].roll}</div><div>${players[i].score}</div>`