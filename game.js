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
        this.goodBoi = new playerSquare(this.contextX+130, this.contextY+130, 40);
    }

    draw(){
        this.colorCanvas();
        this.drawArena();
        this.drawGoodBoi();
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

    drawGoodBoi(){
        this.context.fillStyle = this.goodBoi.getColor();
        this.context.fillRect(this.goodBoi.getX(), this.goodBoi.getY(), this.goodBoi.getWidth(), this.goodBoi.getWidth());
    }

    update(){
        this.goodBoi.update();
        this.drawGoodBoi();
    }

    tick(){
        this.draw();
        this.update();
        requestAnimationFrame(this.tick());
    }

}

let game = new Game('gameCanvas');
game.tick();