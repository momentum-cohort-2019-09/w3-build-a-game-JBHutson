class playerSquare{
    constructor(initX, initY, width){
        this.x = initX;
        this.y = initY;
        this.w = width;
        this.keyboarder = new Keyboarder();
    }

    update(){
        if (this.keyboarder.isDown(37)) {
            this.x -= 2
          } else if (this.keyboarder.isDown(39)) {
            this.x += 2
          }
    }

    setX(dist){
        this.x = this.x+dist;
    }

    setY(dist){
        this.y = this.y+dist;
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