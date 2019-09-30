class playerSquare{
    constructor(initX, initY, width){
        this.x = initX;
        this.y = initY;
        this.w = width;
        this.keyboarder = new Keyboarder();
    }

    update(){
        if (this.keyboarder.isDown(39)){
            this.moveRight();
        } else if (this.keyboarder.isDown(37)){
            this.moveLeft();
        } else if (this.keyboarder.isDown(38)){
            this.moveUp();
        } else if (this.keyboarder.isDown(40)){
            this.moveDown();
        }
    }

    moveUp(){
        if (this.y != 150){
            this.y -= 5;
        }
    }

    moveDown(){
        if (this.y != 410){
            this.y +=5;
        }
    }

    moveLeft(){
        if (this.x != 150){
            this.x -= 5;
        }
    }

    moveRight(){
        if (this.x != 410){
            this.x += 5;
        }
    }

    getColor(){
        return 'blue';
    }

    getY(){
        return this.y;
    }

    getX(){
        return this.x;
    }

    getWidth(){
        return this.w;
    }
}

class BadSquare {
    constructor(initX, initY, speed, direction){
        this.x = initX;
        this.y = initY;
        this.s = speed;
        this.d = direction;
        this.c = 'red'
        this.w = 20;
    }

    update(){
        if (this.d == 'right'){
            this.x += this.s;
        } else if (this.d == 'left'){
            this.x -= this.s;
        } else if (this.d == 'down'){
            this.y += this.s;
        } else if (this.d == 'up'){
            this.y -= this.s;
        }
    }

    getColor(){
        return this.c;
    }

    getY(){
        return this.y;
    }

    getX(){
        return this.x;
    }

    getWidth(){
        return this.w;
    }
}

class ReallyBadSquare {
    constructor(initX, initY, speed, direction){
        this.x = initX;
        this.y = initY;
        this.s = speed;
        this.d = direction;
        this.c = 'green';
        this.w = 20;
    }

    update(){
        if (this.d == 'right'){
            this.x += this.s;
        } else if (this.d == 'left'){
            this.x -= this.s;
        } else if (this.d == 'down'){
            this.y += this.s;
        } else if (this.d == 'up'){
            this.y -= this.s;
        }
    }

    getColor(){
        return this.c;
    }

    getY(){
        return this.y;
    }

    getX(){
        return this.x;
    }

    getWidth(){
        return this.w;
    }
}