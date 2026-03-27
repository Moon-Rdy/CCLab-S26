let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Makabaka(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Makabaka {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.r = random(100, 150);
    this.g = random(150, 180);
    this.b = random(100, 160);
    this.angle = 0;
    this.clap = 0;
    this.jumpVal = 0;
    this.jumpY = 0;
    this.armLen = 36;

  }
  update() {
    this.angle += 0.03;
    this.clap += 0.08;

    this.r += 1;
    this.g += 1;
    this.b += 1;
    if (this.r > 255) {
      this.r = random(100, 150);
    }
    if (this.g > 255) {
      this.g = random(150, 200);
    }
    if (this.r > 255) {
      this.b = random(100, 160);
    }

    if (mouseIsPressed) {
      dancer.jumpVal = -10;
    }
    this.jumpVal += 0.8;
    this.jumpY += this.jumpVal;
    if (this.jumpY >= 0) {
      this.jumpY = 0;
      this.jumpVal = 0;
    }

    this.flashColor = [this.r, this.g, this.b];

  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    let bounce = sin(this.angle * 2) * 5;
    translate(this.x, this.y + bounce + this.jumpY);

    // ⬇️ draw your dancer from here ⬇️

    let d = dist(mouseX, mouseY, this.x, this.y);
    let mouseFactor = map(d, 0, 200, 0.8, 0.2);
    this.clap += mouseFactor * 0.06;

    let s = sin(this.clap);
    let leanAngle = s * 0.35;
    rotate(leanAngle);
    let clapClose = s;
    if (s < 0) {
      clapClose = -s;
    }
    let side;
    if (s > 0) {
      side = 1;
    } else {
      side = -1;
    }

    let inAir = false;
    if (this.jumpY < -5) {
      inAir = true;
    }

    if (inAir == true) {
      push();
      translate(15, 38);
      rotate(-0.7);
      fill(210, 195, 165);
      stroke(160, 140, 110);
      strokeWeight(2);
      ellipse(0, 10, 16, 24);
      fill(90, 70, 50);
      noStroke();
      ellipse(0, 22, 20, 10);
      pop();

      push();
      translate(-15, 38);
      rotate(0.7);
      fill(210, 195, 165);
      stroke(160, 140, 110);
      strokeWeight(2);
      ellipse(0, 10, 16, 24);
      fill(90, 70, 50);
      noStroke();
      ellipse(0, 22, 20, 10);
      pop();
    } else {
      // leg down
      let supportX = side * 12;
      fill(210, 195, 165);
      stroke(160, 140, 110);
      strokeWeight(2);
      ellipse(supportX, 52, 16, 24);
      // feet down
      fill(90, 70, 50);
      noStroke();
      ellipse(supportX, 65, 20, 10);
      // leg up
      let liftX = -side * 12;
      let liftLegAngle = side * 0.55; // 向外倾斜
      push();
      translate(liftX, 42);
      rotate(liftLegAngle);
      fill(210, 195, 165);
      stroke(160, 140, 110);
      strokeWeight(2);
      ellipse(0, 10, 14, 22);
      // feet up
      fill(90, 70, 50);
      noStroke();
      push();
      translate(side * -8, 22);
      rotate(side * 0.7);
      ellipse(0, 0, 18, 8);
      pop();
      pop();
    }
    // body
    fill(235, 220, 190);
    stroke(180, 155, 120);
    strokeWeight(2);
    ellipse(0, 10, 62, 68);

    // head
    fill(235, 220, 190);
    stroke(180, 155, 120);
    strokeWeight(2);
    ellipse(0, -38, 48, 33);
    ellipse(25, -38, 6, 15);
    ellipse(29, -38, 5, 12);
    ellipse(-25, -38, 6, 15);
    ellipse(-29, -38, 5, 12);
    ellipse(0, -57, 18, 7);
    ellipse(0, -62, 12, 5);
    fill(180, 155, 120);
    ellipse(33, -38, 5, 5);
    ellipse(-33, -38, 5, 5);
    ellipse(0, -66, 5, 5);

    // eyes
    fill(55, 38, 20);
    noStroke();
    ellipse(-10, -40, 10, 11);
    ellipse(10, -40, 9, 10);
    fill(255);
    ellipse(-8, -43, 4, 4);
    ellipse(12, -43, 3, 3);

    // nose
    fill(200, 118, 85);
    stroke(155, 88, 58);
    strokeWeight(1.5);
    ellipse(0, -33, 3, 1);

    // mouth
    noFill();
    stroke(135, 98, 65);
    strokeWeight(2);
    arc(0, -30, 15, 7, 0, PI);

    let lhx, lhy, rhx, rhy;
    if (inAir == true) {
      lhx = -24 + cos(-2.2) * this.armLen;
      lhy = 2 + sin(-2.2) * this.armLen;
      rhx = 24 + cos(-0.9) * this.armLen;
      rhy = 2 + sin(-0.9) * this.armLen;
      stroke(180, 155, 120);
      strokeWeight(9);
      line(-24, 2, lhx, lhy);
      fill(235, 220, 190);
      stroke(180, 155, 120);
      strokeWeight(1.5);
      ellipse(lhx, lhy, 13, 13);
      stroke(180, 155, 120);
      strokeWeight(9);
      line(24, 2, rhx, rhy);
      fill(235, 220, 190);
      stroke(180, 155, 120);
      strokeWeight(1.5);
      ellipse(rhx, rhy, 13, 13);
    } else {
      // arm movement
      let armSpread = (1 - clapClose) * 0.5;
      let leftArmAngle = side * (-0.25 - armSpread * 0.5);
      let rightArmAngle = side * (-0.25 + armSpread * 0.5);

      let lArmLen = 36;
      let rArmLen = 36;
      lhx = -24 + cos(leftArmAngle) * lArmLen * side;
      rhx = 24 + cos(rightArmAngle) * rArmLen * side;
      lhy = 2 - armSpread * 25;
      rhy = 2 + armSpread * 25;
      // left arm
      stroke(180, 155, 120);
      strokeWeight(9);
      line(-24, 2, lhx, lhy);
      fill(235, 220, 190);
      stroke(180, 155, 120);
      strokeWeight(1.5);
      ellipse(lhx, lhy, 13, 13);
      // right arm
      stroke(180, 155, 120);
      strokeWeight(9);
      line(24, 2, rhx, rhy);
      fill(235, 220, 190);
      stroke(180, 155, 120);
      strokeWeight(1.5);
      ellipse(rhx, rhy, 13, 13);
    }
    // clap light

    if (inAir == false) {
      if (clapClose > 0.88) {
        let mx = (lhx + rhx) / 2;
        let my = (lhy + rhy) / 2;
        noStroke();
        fill(this.flashColor, 150);
        ellipse(mx, my, 26, 26);
        fill(255, 255, 255, map(clapClose, 0.88, 1, 0, 100));
        ellipse(mx, my, 14, 14);
      }
    }

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes();

    pop();
  }
  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
