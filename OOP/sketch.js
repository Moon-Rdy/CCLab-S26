let cloud;

function setup() {
  createCanvas(400, 400);
  cloud = new Cloud();
}

function draw() {
  background(220);
  cloud.display();
  cloud.update();
  cloud.drawRightArm();
  cloud.drawLeftArm();
}

class Cloud {
  //constructor(setup)
  constructor() {
this.x = 0;
this.y = 0;
this.xc = this.x;
this.yc = this.y;
this.s = 1;
  }
  display() {

  push();
  translate(this.x, this.y);
  scale(this.s);
  this.drawRightArm();
  this.drawLeftArm();
  noStroke();
  //body
  circle(0, 0, 100);
  //circles around
  for (let a = 0; a < 2 * PI; a += PI / 6) {
    push();
    rotate(a);
    circle(50, 30, 50);
    pop();
  }
  //eyes
  fill(0);
  circle(-30, 0, 5);
  circle(30, 0, 5);
  arc(0, 0, 30, 30, 0, PI);
  pop();
}
update(){
this.x = width + cos(frameCount * 0.1)*100;
this.y = height + sin(frameCount * 0.1)*100;
}

drawRightArm() {
  //arms
  push();
  beginShape();
  let lineLength2 = 100;
  noFill();
  for (let i = -lineLength2; i <= lineLength2; i += lineLength2 / 10) {
    strokeWeight(10);
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(i, v);
  }
  endShape();
  pop();
}
drawLeftArm() {
  //arms
  push();
  scale(-1, 1);
  beginShape();
  let lineLength2 = 100;
  noFill();
  for (let i = -lineLength2; i <= lineLength2; i += lineLength2 / 10) {
    strokeWeight(10);
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(i, v);
  }
  endShape();
  pop();
}
}