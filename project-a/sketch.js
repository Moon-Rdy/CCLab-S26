/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x0, y0;
let s;
let amount = 110;
let distance = 0;
let sep0 = 12;
let away; //background
let coreRadius = 15;
let x, y;
let creatureScale = 1; //creature

let escape = false;
let accX = 0;
let accY = 0;
let speedX = 0;
let speedY = 0;
let away1 = 0.3; //change this to make it go further

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  x = width/2;
  y = height / 2;
}

function draw() {
  background(0, 100);

  drawCreature();
  drawBackground();
}

function drawCreature() {
  let t = frameCount * 0.01;
  let d = dist(mouseX, mouseY, x, y);
  let speed = random(0.005, 0.02);

  if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
    let destiX = map(d, 0, width, mouseX - 10, mouseX + 10);
    let destiY = map(d, 0, height, mouseY - 10, mouseY + 10);
    let finalX = cos(t * 1.5) * 100 + destiX;
    let finalY = sin(t * 2) * 60 + destiY;
    x = lerp(x, finalX, 0.03);
    y = lerp(y, finalY, 0.03);
  } else {
    x = width / 2 + cos(t * 1.5) * 100;
    y = height / 2 + sin(t * 2) * 60;
  }

  if (mouseIsPressed && d < 130 && !escape) {
    escape = true;
  }
  if (escape) {
    accX = (mouseX - x) * -away1;
    accY = (mouseY - y) * -away1;
    speedX += accX;
    speedY += accY;

    speedX = speedX * 0.9; // 10% less per frame
    speedY = speedY * 0.9; // 10% less per frame
    speedX = constrain(speedX, -10, 10);
    speedY = constrain(speedY, -10, 10);

    x += speedX;
    y += speedY;

    let s = map(d, 0, 300, 1, 0.1);
    //let s = map(d, 0, 300, 0.1, 1);
    s = constrain(s, 0.1, 1);
    creatureScale = lerp(creatureScale, s, 0.8);

    if (x < 0 || x > width) {
      speedX = -1 * speedX;
      x = constrain(x, 0, width);
    }

    if (y < 0 || y > height) {
      speedY = -1 * speedY;
      y = constrain(y, 0, height);
    }

    // if ((speedX < 0.1 && speedX > -0.1) || (speedY < 0.1 && speedY > -0.1)) {
    //   escape = false;
    //   console.log("YESSS");
    //   //creatureScale = 1;
    // }

    if (d > 500) {
      escape = false;
      console.log("YESSS");
    }
  } else {
    creatureScale = lerp(creatureScale, 1, 0.01);
  }

  push();
  translate(x, y);
  //translate(mouseX, mouseY);
  scale(creatureScale);
  drawCore();
  drawArrow1();
  drawArrow2();
  drawArrow3();
  pop();
  console.log(escape);
  console.log(speedY);
}

function drawCore() {
  push();

  let floatScale = sin(frameCount * 0.05) * 0.07 + 1;
  scale(floatScale);

  noFill();
  strokeWeight(2);
  stroke(230, 232, 245, 180);
  circle(0, 0, coreRadius * 2); //outer
  strokeWeight(1.5);
  stroke(210, 212, 228, 180);
  circle(0, 0, coreRadius * 1.5); //middle
  stroke(195, 198, 215, 180);
  circle(0, 0, coreRadius); //inner

  strokeWeight(1);
  stroke(220, 222, 238, 180);
  for (let i = 0; i < 8; i++) {
    let a = (TWO_PI / 8) * i;
    line(0, 0, cos(a) * coreRadius, sin(a) * coreRadius);
  }

  fill(255, 255, 255);
  noStroke();
  circle(0, 0, 5);

  pop();
}

function drawArrow1() {
  let sinVal = sin(frameCount * 0.01);
  // let noiseVal = map(noise(frameCount * 0.05), 0, 1, -0.2, 0.2);
  let angleBase1 = frameCount * 0.0;
  let angle1 = angleBase1 + sinVal;

  let length = 70;
  let i = 0;
  // let sep = map(noise(i), 0, 1, PI/7, PI/3);
  let sep = PI / 4;

  for (let a = 0; a < 2 * PI; a += sep) {
    push();
    rotate(angle1);
    rotate(a);
    stroke(180, 185, 200, 230);
    strokeWeight(1);
    line(coreRadius, 0, coreRadius + 20, 0);
    stroke(240, 240, 255, 150);
    strokeWeight(2);
    line(coreRadius + 22, 0, coreRadius + 32, 7);
    line(coreRadius + 22, 0, coreRadius + 32, -7);

    for (let l = coreRadius + 35; l < coreRadius + length; l += 8) {
      let w = map(l, coreRadius + 35, coreRadius + length, 2, 0.5);
      strokeWeight(w);
      line(l, 0, l + 2, 0);
    }

    let edgeX = coreRadius + length + 8;
    noStroke();
    fill(240, 242, 255, 210);
    beginShape();
    vertex(edgeX, -4);
    vertex(edgeX + 10, -2);
    vertex(edgeX + 13, 0);
    vertex(edgeX + 10, 2);
    vertex(edgeX, 4);
    endShape();

    stroke(250, 250, 255);
    strokeWeight(1.5);
    line(edgeX + 10, 0, edgeX + 22, 0);

    pop();
  }
}

function drawArrow2() {
  let sinVal = sin(frameCount * 0.02);
  // let noiseVal = map(noise(frameCount * 0.05), 0, 1, -0.2, 0.2);
  let angleBase2 = frameCount * 0.0;
  let angle2 = angleBase2 + sinVal;

  let length = 90;
  let i = 0;
  // let sep = map(noise(i), 0, 1, PI/7, PI/3);
  let sep = PI / 3;

  for (let a = 0; a < 2 * PI; a += sep) {
    push();
    rotate(angle2);
    rotate(a);
    stroke(180, 185, 200, 230);
    strokeWeight(1);
    line(coreRadius, 0, coreRadius + 20, 0);
    stroke(240, 240, 255, 150);
    strokeWeight(2);
    line(coreRadius + 22, 0, coreRadius + 32, 7);
    line(coreRadius + 22, 0, coreRadius + 32, -7);

    for (let l = coreRadius + 35; l < coreRadius + length; l += 8) {
      let w = map(l, coreRadius + 35, coreRadius + length, 2, 0.5);
      strokeWeight(w);
      line(l, 0, l + 2, 0);
      line(l + 5, 0, l + 7, 2);
      line(l + 5, 0, l + 7, -2);
    }

    let edgeX = coreRadius + length + 8;
    noStroke();
    fill(240, 242, 255, 210);
    beginShape();
    vertex(edgeX, -4);
    vertex(edgeX + 10, -2);
    vertex(edgeX + 13, 0);
    vertex(edgeX + 10, 2);
    vertex(edgeX, 4);
    endShape();

    stroke(250, 250, 255);
    strokeWeight(1.5);
    line(edgeX + 10, 0, edgeX + 22, 0);

    pop();
  }
}

function drawArrow3() {
  let sinVal = sin(frameCount * 0.02);
  // let noiseVal = map(noise(frameCount * 0.05), 0, 1, -0.2, 0.2);
  let angleBase3 = frameCount * 0.01;
  let angle3 = angleBase3 + sinVal;

  let length = 50;
  let i = 0;
  // let sep = map(noise(i), 0, 1, PI/7, PI/3);
  let sep = PI / 3;

  for (let a = 0; a < 2 * PI; a += sep) {
    push();
    rotate(angle3);
    rotate(a);
    stroke(180, 185, 200, 230);
    strokeWeight(1);
    line(coreRadius, 0, coreRadius + 20, 0);
    stroke(240, 240, 255, 150);
    strokeWeight(2);
    line(coreRadius + 22, 0, coreRadius + 32, 7);
    line(coreRadius + 22, 0, coreRadius + 32, -7);

    for (let l = coreRadius + 35; l < coreRadius + length; l += 8) {
      let w = map(l, coreRadius + 35, coreRadius + length, 2, 0.5);
      strokeWeight(w);
      line(l, 0, l + 2, 0);
      line(l + 3, 0, l + 5, -5);
      line(l + 3, 0, l + 5, 5);
    }

    let edgeX = coreRadius + length + 8;
    noStroke();
    fill(240, 242, 255, 210);
    beginShape();
    vertex(edgeX, -4);
    vertex(edgeX + 10, -2);
    vertex(edgeX + 13, 0);
    vertex(edgeX + 10, 2);
    vertex(edgeX, 4);
    endShape();

    stroke(250, 250, 255);
    strokeWeight(1.5);
    line(edgeX + 10, 0, edgeX + 22, 0);

    pop();
  }
}

function drawBackground() {
  push();
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);

  for (let angle = 0; angle < 2 * PI; angle += PI / 10) {
    for (let ring = sep0; ring < amount; ring += sep0) {
      let innerR = ring * 2;
      let outerR = ring * 3.5;
      let R = map(ring, 0, amount, innerR, outerR);

      let s = map(ring, 1, amount, 1, 12);
      let t = frameCount * 0.007;
      let f = map(noise(ring * 0.2, angle, t), 0, 1, -20, 20);

      let x0 = (R + f) * cos(angle) + width / 2;
      let y0 = (R + f) * sin(angle) + height / 2;

      let d = dist(x0, y0, x, y);
      let influence = map(d, 0, 300, 1, 0);

      let rotation = noise(x0 * 0.01, y0 * 0.01, frameCount * 0.01) * 2 * PI;
      let bloom = (influence * PI) / 3;

      let dx0 = x0 - x;
      let dy0 = y0 - y;

      R += sin(frameCount * 0.05 + ring) * 5;

      let alphaAvoid = map(d, 0, 300, 0, 1);

      if (alphaAvoid < 0.4) {
        away = 40;

        x0 = (R + f) * cos(angle + distance) + width / 2 + (away * dx0) / d;
        y0 = (R + f) * sin(angle + distance) + height / 2 + (away * dy0) / d;
      }

      let hue = map(ring, 1, amount, 360, 0);
      let alpha = (20 + influence * 50) * alphaAvoid;

      // let creatureScale = map(d, 0, 300, 0.8, 1.2);
      let breath = sin(frameCount * 0.05 + ring) * 0.1;
      let rectS = s * influence * 1.7 * (1 + breath);

      if (x > 0 && x < width && y > 0 && y < height) {
        noStroke();
        fill(hue, 80, 85, alpha);

        push();
        translate(x0, y0);
        rotate(rotation + bloom);
        beginShape();
        vertex(0, -1.2 * rectS);
        vertex(1.25 * rectS, 0);
        vertex(0, 1.2 * rectS);
        vertex(-1.25 * rectS, 0);
        endShape();
        stroke(hue, 100, 60, alpha);
        strokeWeight(2);
        line(0 - 1.5 * s, 0, 0 + 1.5 * s, 0);
        pop();
      } else {
        noStroke();
        fill(hue, 80, 85, alpha);

        push();
        translate(x0, y0);
        rotate(rotation + bloom);
        beginShape();
        vertex(0, -1.2 * rectS);
        vertex(1.25 * rectS, 0);
        vertex(0, 1.2 * rectS);
        vertex(-1.25 * rectS, 0);
        endShape();
        stroke(hue, 100, 60, alpha);
        strokeWeight(2);
        line(0 - 1.5 * s, 0, 0 + 1.5 * s, 0);
        pop();
      }
    }
  }
  pop();
}
