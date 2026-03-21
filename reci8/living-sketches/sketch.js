let scanned = [];
let tree;
let human;
let curFrame = 0;
let humanX = 0;

let leavesX = [];
let leavesY = [];
let flashAlpha = 0;
let days = ["Mar 7", "Mar 12", "Mar 18", "Mar 23"];


function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("reci8-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);
  tree = crop(scanned, 0, 50, 500, 500);
  human = crop(scanned, 1000, 1000, 1300, 1500);
}

function draw() {
  background(255);

  curFrame = constrain(curFrame, 0, 3);

  drawTree();
  drawHuman();
  drawLeaves();
  drawCalendar(670, 30);
  drawFlashAlpha();
}

function drawTree() {
  let sway = sin(frameCount * 0.03) * 0.05;

  push();
  translate(50 + tree[0].width / 2, height - tree[0].height * 0.8);
  rotate(sway);
  imageMode(CENTER);
  image(tree[curFrame], 0, tree[0].height / 2);
  imageMode(CORNER);
  pop();
}

function drawHuman() {
  let tilt = map(mouseX, 0, width, -0.1, 0.1);
  let humanX = map(curFrame, 0, tree.length - 1, width - 450, 200);
 push();
translate(humanX, 250);
translate(50, 50);
rotate(tilt);
translate(-50, -50);

image(human[curFrame], 0, 0, human[0].width * 0.4, human[0].height * 0.4);
pop();
}

function drawLeaves() {


  let leavesState = map(curFrame, 0, 3, 0.06, 0.3);
  if (curFrame <= 2 && random() < leavesState && leavesX.length < 70) {
    leavesX.push(random(50, 550));
    leavesY.push(80);
  }
  for (let i = 0; i < leavesX.length; i++) {
    leavesX[i] += random(-1.5, 1.5);
    leavesY[i] += random(0.5, 1.5);

    push();
    translate(leavesX[i], leavesY[i]);

    rotate(frameCount * 0.02 + i);

    fill(255, random(200, 240), 40);

    let s = 25 + (i % 10);
    noStroke();
    beginShape();
    vertex(0, s * -0.5);          // top
    vertex(s * 0.4, 0);       // right
    vertex(0, s / 2);           // bottom
    vertex(s * -0.3, 0);      // left
    endShape(CLOSE);
    pop();

    if (leavesY[i] > height) {
      leavesX.splice(i, 1);
      leavesY.splice(i, 1);
    }
    if (curFrame === 3) {
      leavesX = [];
      leavesY = [];
      i--;
    }
  }

}

function drawCalendar(x, y) {
  noStroke();
  fill(0, 30);
  rect(x + 4, y + 4, 90, 80, 10);

  // 主卡片
  fill(255);
  rect(x, y, 90, 80, 10);

  // 顶部夹子
  fill(180, 80, 60);
  rect(x + 15, y - 5, 15, 10, 3);
  rect(x + 60, y - 5, 15, 10, 3);

  // 装订线
  stroke(200);
  line(x, y + 20, x + 90, y + 20);
  noStroke();

  // 文字
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(days[curFrame], x + 45, y + 45);
}

function mousePressed() {
  // right - next frame
  if (mouseX > 700 && mouseX < 800 && mouseY > 30 && mouseY < 110) {
    if (curFrame < 3) {
      curFrame++;
    }
  }
  // left - last frame
  if (mouseX > 620 && mouseX < 700 && mouseY > 30 && mouseY < 110) {
    if (curFrame > 0) {
      curFrame--;
    }
  }
  // 4th frame - photo
  if (curFrame === 3) {
    flashAlpha = 255;
  }
}

function drawFlashAlpha() {
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    rect(0, 0, width, height);

    fill(0, flashAlpha * 0.3);
    textSize(100);
    textAlign(CENTER);
    text("📸", width / 2, height / 2);
    flashAlpha -= 2;
  }
}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
