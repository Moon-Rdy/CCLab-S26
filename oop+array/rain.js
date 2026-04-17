 class Rain {
  constructor(x, y) {
    //declaring variables
    this.x = x + random(-20, 20);
    this.y = y;
    this.isOut = false;
  }
  checkCollision(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < (this.sc + other.sc) * 100 / 2) {
            console.log("boom");
            this.h = random(100);
            if (!this.sound.isPlaying()){
                this.sound.play();
            }
        }
    }
  displayRain() {
    //everything that will display the rain
    strokeWeight(5);
    line(this.x, this.y, this.x, this.y + 5);
  }
  updateRain() {
    //updating the Y position
    this.y = this.y + 5;
    if(this.y > height){
      this.isOut = true;
    }
  }
}
