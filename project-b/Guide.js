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

    let a = map(sin(frameCount * 0.07), -1, 1, 130, 180);

    push();
    rotateX(PI / -2.5);

    if (this.guideState == 0) {
      fill(255, 255, 0, a);
    } else {
      fill(255, 255, 0, 0);
    }
    // circle(width / 2 - 30, -height / 2 + 30, 30);
    triangle(width/2-60, -height/2+50, width/2-50, -height/2+80, width/2-40, -height/2+50);
    triangle(width/2-50, -height/2+60, width/2-20, -height/2+50, width/2-50, -height/2+40);
    triangle(width/2-60, -height/2+50, width/2-50, -height/2+20, width/2-40, -height/2+50);
    triangle(width/2-50, -height/2+60, width/2-80, -height/2+50, width/2-50, -height/2+40);

    if (this.guideState == 1) {
      fill(255, 255, 0, a);
    } else {
      fill(255, 255, 0, 0);
    }
    triangle(width/2-60, height/2-50, width/2-50, height/2-80, width/2-40, height/2-50);
    triangle(width/2-50, height/2-60, width/2-20, height/2-50, width/2-50, height/2-40);
    triangle(width/2-60, height/2-50, width/2-50, height/2-20, width/2-40, height/2-50);
    triangle(width/2-50, height/2-60, width/2-80, height/2-50, width/2-50, height/2-40);

    if (this.guideState == 1.5) {
      fill(255, 255, 0, a);
    } else {
      fill(255, 255, 0, 0);
    }
    triangle(-width/2+60, height/2-50, -width/2+50, height/2-80, -width/2+40, height/2-50);
    triangle(-width/2+50, height/2-60, -width/2+20, height/2-50, -width/2+50, height/2-40);
    triangle(-width/2+60, height/2-50, -width/2+50, height/2-20, -width/2+40, height/2-50);
    triangle(-width/2+50, height/2-60, -width/2+80, height/2-50, -width/2+50, height/2-40);

    if (this.guideState == 2) {
      fill(255, 255, 0, a);
    } else {
      fill(255, 255, 0, 0);
    }
    triangle(-width/2+60, -height/2+50, -width/2+50, -height/2+80, -width/2+40, -height/2+50);
    triangle(-width/2+50, -height/2+60, -width/2+20, -height/2+50, -width/2+50, -height/2+40);
    triangle(-width/2+60, -height/2+50, -width/2+50, -height/2+20, -width/2+40, -height/2+50);
    triangle(-width/2+50, -height/2+60, -width/2+80, -height/2+50, -width/2+50, -height/2+40);

    if (this.guideState == 3) {
      fill(255, 255, 0, a);
    } else {
      fill(255, 255, 0, 0);
    }
    triangle(width/2-60, -height/2+50, width/2-50, -height/2+80, width/2-40, -height/2+50);
    triangle(width/2-50, -height/2+60, width/2-20, -height/2+50, width/2-50, -height/2+40);
    triangle(width/2-60, -height/2+50, width/2-50, -height/2+20, width/2-40, -height/2+50);
    triangle(width/2-50, -height/2+60, width/2-80, -height/2+50, width/2-50, -height/2+40);

    pop();

    // text
    push();
    translate(0, height - 300, 0);
    rotateX(PI/-2.5);
    fill(255, 250, 250, 200);
    noStroke();
    textSize(7);
    textAlign(CENTER);
    textFont(font);
    text("follow the light with your hand", 0, 0);
    pop();
  }
}
