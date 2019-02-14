let playButton = document.getElementById("play");
let rollDiceButton = document.getElementById("roll")


class Game {
    constructor() {
        this.players = [];
        this.playerInput = "";
        this.gameCount = 0;
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

    gameProgress() {
        for(let i=0; i<this.players.length; i++) {
            if (this.players[i].bust == false && this.players[i].score < 21) {

            }
        }
        
        
    }
    
    initialise() {
        var response = prompt(`Current players are:\n\n${this.players}\n\nDo you want to add any more? (y/n)`);
        if (response == "y" || response == "n") {
            if (response == "y") {
                this.players.push(new Player(prompt(`What's your name?`)));
                    console.log(this.players);
                    this.initialise();
            }
            else {
                if(this.players.length>0) {
                    this.gameProgress();
                }
                else {
                    alert(`You can't play a game with no players! Goodbye!`)
                }
            }
        }
        else {
            alert(`${response} is not a valid response, please try again.`);
            this.initialise();
        }
    }
    
    scoreBoardUpdater() {
        let scoreBoard = document.getElementById("scoreboard-inner");
        console.log(players);
        for(i=0; i<players.length; i++) {
            scoreBoard.insertAdjacentHTML("beforeend", `<div>Dave</div><div>5</div><div>6</div>`)
        }
    }

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