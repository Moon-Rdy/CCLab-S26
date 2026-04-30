class Guide {
  constructor() {
    this.guideState = 0;
  }

  update(stage, preStage) {
    if (stage == 0) {
      this.guideState = 0;
    } else if (stage == 1) {
      this.guideState = 1;
    } else if (stage == 2) {
      this.guideState = 2;
    } else if (stage == 3) {
      this.guideState = 3;
    } else if (stage == 1.5) {
      this.guideState = 1.5;
    }
  }

  draw() {
    noStroke();

    let a = map(sin(frameCount * 0.1), -1, 1, 80, 230);

    push();
    rotateX(PI / -2.5);

    if (this.guideState == 0) {
      fill(255, 200, 80, a);
    } else {
      fill(255, 200, 80, 0);
    }
    circle(width / 2 - 30, -height / 2 + 30, 10);

    if (this.guideState == 1) {
      fill(255, 200, 80, a);
    } else {
      fill(255, 200, 80, 0);
    }
    circle(width / 2 - 30, height / 2 - 30, 10);

    if (this.guideState == 1.5) {
      fill(255, 200, 80, a);
    } else {
      fill(255, 200, 80, 0);
    }
    circle(-width / 2 + 30, height / 2 - 30, 10);

    if (this.guideState == 2) {
      fill(255, 200, 80, a);
    } else {
      fill(255, 200, 80, 0);
    }
    circle(-width / 2 + 30, -height / 2 + 30, 10);

    if (this.guideState == 3) {
      fill(255, 200, 80, a);
    } else {
      fill(255, 200, 80, 0);
    }
    circle(width / 2 - 30, -height / 2 + 30, 10);

    pop();

    // text
    push();
    translate(0, height / 2 + 80, 0);
    rotateX(PI/-2.5);
    fill(255, 240, 240, 200);
    noStroke();
    textSize(10);
    textAlign(CENTER);
    textFont(font);
    text("follow the light with your hand", 0, 0);
    pop();
  }
}
