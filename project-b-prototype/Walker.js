class Walker {
  constructor(mobius) {
    this.mobius = mobius;
    this.x1 = 0;
    this.y1 = 0;
    this.z1 = 0;
    this.currentW = 0;
    this.targetW = 0;
    this.stage = 0;
    this.i = 0;
    this.previ = 0;
  }

  update() {
    this.previ = this.i;
    if (this.stage == 1 && this.i < 90) {
      this.i += 1;
    }
    if (this.stage == 2 && this.i < 300) {
      this.i += 1;
    }
    if (this.stage == 3 && this.i < 500) {
      this.i += 1;
    }
  }

  drawIda(p, rWidth, s) {
    let point = p;
    console.log(p.x0);

    let nx = cos(p.twist) * cos(p.angle);
    let ny = cos(p.twist) * sin(p.angle);
    let nz = sin(p.twist);

    let x1 = p.x0 + nx * rWidth * this.currentW;
    let y1 = p.y0 + ny * rWidth * this.currentW;
    let z1 = p.z0 + nz * rWidth * this.currentW;

    push();
    translate(x1, y1, z1);
    scale(0.2);
    // rotateZ(p.angle);
    rotateZ(p.twist);
    rotateX(p.twist);
    // rotateZ(-rotateAn);
    rotateX(-PI / 2.5);

    translate(0, -220, 0);
    let breathe = sin(frameCount * 0.03) * 3;
    translate(0, breathe, 0);

    //test
    // noStroke();
    // fill(255, 0, 0);
    // circle(0, 0, 50);

    noStroke();
    // dress
    fill(232, 232, 224);
    if (this.i != this.previ) {
      quad(-8, -57, 21, -55, 150, 110, -70, 65);
    } else {
      quad(-8, -57, 21, -55, 100, 110, -85, 65);
    }

    let legSwing;
    if (this.previ != this.i) {
      legSwing = sin(frameCount * 0.15) * 0.3;
    } else {
      legSwing = sin(frameCount * 0.01) * 0.03;
    }

    fill(230, 225, 215);
    // legs
    push();
    translate(-20, 90, 0);
    rotate(legSwing);
    rect(0, 0, 15, 105, 8);
    pop();
    push();
    translate(20, 100, 0);
    rotate(-legSwing);
    rect(0, 0, 15, 105, 8);
    pop();

    // feet
    push();
    translate(-20, 90, 0);
    rotate(legSwing);
    translate(0, 105, 0);
    rotate(-PI / 5);
    ellipse(7, 0, 30, 20);
    pop();
    push();
    translate(20, 100, 0);
    rotate(-legSwing);
    translate(0, 105, 0);
    rotate(-PI / 5);
    ellipse(7, 0, 30, 20);
    pop();

    // // neck
    // push();
    // translate(0, 0, 1);
    // fill(26, 26, 26);
    // rect(-10, -90, 32, 43, 18);
    // pop();

    let capeColor;
if (this.stage == 0 || this.stage == 1) {
  capeColor = color(200, 130, 100);
} else if (this.stage == 2) {
  capeColor = color(130, 145, 205);
} else if (this.stage == 3) {
  capeColor = color(90, 95, 110);
}

    fill(capeColor);
    quad(-15, -80, 28, -80, 70, -35, -45, -35);

    let headX = map(mouseX, 0, width, -0.5, 0.25);
    let headY = map(mouseY, 0, height, -0.1, 0.15);

    // hat
    push();
    translate(0, 0, 0);
    rotateY(headX);
    rotateX(headY);
    fill(232, 232, 224);
    triangle(-10, -184, 35, -89, 130, -250);
    pop();

    // head black
    push();
    translate(0, 0, 1);
    rotateY(headX);
    rotateX(headY);
    fill(26, 26, 26);
    ellipse(0, -130, 90, 96);
    pop();

    // head white
    push();
    translate(0, 0, 2);
    rotateY(headX);
    rotateX(headY);
    fill(232, 232, 224);
    ellipse(-10, -120, 66, 80);
    ellipse(-12, -120, 66, 85);
    pop();

    pop();
  }
}
