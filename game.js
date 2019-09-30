class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.gameSize = {
            x: this.canvas.width,
            y: this.canvas.width
        }
        this.contextX = 150;
        this.contextY = 150;
        this.count = 0;
        this.goodBoi = new playerSquare(this.contextX+130, this.contextY+130, 40);
        this.reallyBadBois = [];
        this.badBois = [];
        this.requestId = undefined;
        this.gameOver = false;
    }

    draw(){
        this.colorCanvas();
        this.drawArena();
    }

    colorCanvas(){
        this.context.fillStyle = 'grey';
        this.context.fillRect(0, 0, this.gameSize.x, this.gameSize.y);
    }

    drawArena(){
        this.context.beginPath();
        this.context.moveTo(150, 150);
        this.context.lineTo(150, 450);
        this.context.lineTo(450, 450);
        this.context.lineTo(450, 150);
        this.context.lineTo(150, 150);
        this.context.strokeStyle = 'blue';
        this.context.lineWidth = 10;
        this.context.stroke();
    }

    drawBoi(boi){
        this.context.fillStyle = boi.getColor();
        this.context.fillRect(boi.getX(), boi.getY(), boi.getWidth(), boi.getWidth());
    }

    addBadBoi(){
        let potentialXVals = [0, 580, 1];
        let potentialYVals = [0, 580];
        let x = potentialXVals[this.getRandomInt(3)];
        let y = 0;
        if (x == 0){
            y = this.randomIntFromInterval(150, 430);
            let badBoi = new BadSquare(x, y, 10, 'right');
            this.badBois.push(badBoi);
        } else if (x == 580) {
            y = this.randomIntFromInterval(150, 430);
            let badBoi = new BadSquare(x, y, 10, 'left');
            this.badBois.push(badBoi);
        } else {
            y = potentialYVals[this.getRandomInt(2)];
            if (y == 0){
                x = this.randomIntFromInterval(150, 430);
                let badBoi = new BadSquare(x, y, 10, 'down');
                this.badBois.push(badBoi);
            } else if (y == 580){
                x = this.randomIntFromInterval(150, 430);
                let badBoi = new BadSquare(x, y, 10, 'up');
                this.badBois.push(badBoi);
            }
        }
    }

    addReallyBadBoi(){
        let potentialXVals = [0, 580, 1];
        let potentialYVals = [0, 580];
        let x = potentialXVals[this.getRandomInt(3)];
        let y = 0;
        if (x == 0 && this.count == 60){
            y = this.randomIntFromInterval(150, 430);
            let reallyBadBoi = new ReallyBadSquare(x, y, 15, 'right');
            this.reallyBadBois.push(reallyBadBoi);
            this.count = 0;
        } else if (x == 580 && this.count == 60) {
            y = this.randomIntFromInterval(150, 430);
            let reallyBadBoi = new ReallyBadSquare(x, y, 15, 'left');
            this.reallyBadBois.push(reallyBadBoi);
            this.count = 0;
        } else {
            y = potentialYVals[this.getRandomInt(2)];
            if (y == 0 && this.count == 60){
                x = this.randomIntFromInterval(150, 430);
                let reallyBadBoi = new ReallyBadSquare(x, y, 15, 'down');
                this.reallyBadBois.push(reallyBadBoi);
                this.count = 0;
            } else if (y == 580 && this.count == 60){
                x = this.randomIntFromInterval(150, 430);
                let reallyBadBoi = new ReallyBadSquare(x, y, 15, 'up');
                this.reallyBadBois.push(reallyBadBoi);
                this.count = 0;
            }
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    update(){
        this.addBadBoi();
        this.addReallyBadBoi();
        this.addToCount();
        this.goodBoi.update();
        this.drawBoi(this.goodBoi);
        for (let i = 0; i<this.badBois.length; i++){
            this.badBois[i].update();
            this.drawBoi(this.badBois[i]);
        }
        for (let i = 0; i<this.reallyBadBois.length; i++){
            this.reallyBadBois[i].update();
            this.drawBoi(this.reallyBadBois[i]);
        }
        if (this.badBois.length > 0){
            for (let i = 0; i < this.badBois.length; i++) {
                if (!this.boiOnScreen(this.badBois[i])){
                    this.badBois.shift();
                }
            }
        }
        if (this.reallyBadBois.length > 0){
            for (let i = 0; i < this.reallyBadBois.length; i++) {
                if (!this.boiOnScreen(this.reallyBadBois[i])){
                    this.reallyBadBois.shift();
                }
            }
        }
        if (this.colliding()){
            this.gameOver = true;
        }
    }

    colliding(){
        for (let i = 0; i< this.reallyBadBois.length; i++){
            return !(
                this.goodBoi.getX() + this.goodBoi.getWidth() / 2 < this.reallyBadBois[i].getX() - this.reallyBadBois[i].getWidth() / 2 ||
                this.goodBoi.getY() + this.goodBoi.getWidth() / 2 < this.reallyBadBois[i].getY() - this.reallyBadBois[i].getWidth() / 2 ||
                this.goodBoi.getX() - this.goodBoi.getWidth() / 2 > this.reallyBadBois[i].getX() + this.reallyBadBois[i].getWidth() / 2||
                this.goodBoi.getY() - this.goodBoi.getWidth() / 2 > this.reallyBadBois[i].getY() + this.reallyBadBois[i].getWidth() / 2
            );
        };
    }

    boiOnScreen(boi){
        let xOnScreen = false;
        if (boi.getX() >= 0 && boi.getX() <= 600){
            xOnScreen = true;
        }
        if (xOnScreen && boi.getY() >= 0 && boi.getY() <= 600){
            return true;
        } else {
            return false;
        }
    }

    addToCount(){
        this.count++;
    }

    tick(){
        let self = this;
        self.draw();
        self.update();

        if (!this.gameOver){
            this.requestId = requestAnimationFrame(function() {self.tick()});
        }
    }
}

let game = new Game('gameCanvas');
game.tick();