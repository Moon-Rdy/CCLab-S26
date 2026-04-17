class Walker {
  constructor() {
    this.x1 = 0;
    this.y1 = 0;
    this.z1 = 0;
    this.currentW = 0;
    this.targetW = 0;
    this.stage = 0;
    this.i = 0;
  }

  update() {
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
    rotateZ(p.angle);
    rotateZ(p.twist);
    rotateX(p.twist);
    rotateX(-0.5 * PI);
    
    translate(0, -220, 0);

    //test
    // noStroke();
    // fill(255, 0, 0);
    // circle(0, 0, 50);

    noStroke();
    // dress
    fill(232, 232, 224);
    quad(-8, -57, 21, -55, 110, 110, -85, 90);

    // legs
    rect(-30, 90, 20, 105, 8);
    rect(25, 100, 20, 105, 8);

    // feet
    push();
    translate(-22, 205);
    rotate(-PI / 5);
    ellipse(0, 0, 36, 20);
    pop();

    push();
    translate(17, 210);
    rotate(-PI / 5);
    ellipse(0, 0, 36, 20);
    pop();

    // neck
    fill(26, 26, 26);
    rect(-10, -90, 32, 43, 18);

    // hat
    fill(232, 232, 224);
    triangle(-10, -184, 35, -89, 130, -250);

    // head black
    fill(26, 26, 26);
    ellipse(0, -130, 104, 110);

    // head white
    fill(232, 232, 224);
    ellipse(-10, -125, 80, 90);
    ellipse(-12, -125, 80, 95);

    pop();
  }
}
