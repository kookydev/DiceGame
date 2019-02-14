class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.roll = 0;
        this.face = ["./img/dice1.png", "./img/dice2.png", "./img/dice3.png", "./img/dice4.png", "./img/dice5.png", "./img/dice6.png"];
    }

    rollDice() {
        let counter = 1;
        let finalResult = 0;
        const animateDice = () => {
            console.log(`Roll number ${counter}`);
            let result = Math.floor(Math.random() * Math.floor(6));
            this.showFace(result);
            counter++;
            this.roll = result;
        };        
        let rollTimes = Math.floor(Math.random() * Math.floor(20));
        console.log(`Rolltimes: ${rollTimes}`)
        let interval = 150;
        let timeout = rollTimes * interval;        
        var animInterval = setInterval(animateDice, interval);

        setTimeout(function () {clearInterval(animInterval)}, timeout);
    }

    showFace(result) {
        let num = result + 1;
    console.log(num);
    let img = document.getElementById("dice-face");
    img.src = `${this.face[result]}`;
    img.alt = `${num}`;
    }
}

let players = [];

let dave = new Player("Dave");

dave.rollDice();