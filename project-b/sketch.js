let M;
let W;
let T;
let G;
let preStage = 0;
let i = 0;
let stage = 0;
// let rotateAn = 0;

let font;
let handPose;
let video;
let options = { maxHands: 1, flipped: false };
let hands = [];
let p1;

function preload() {
  handPose = ml5.handPose(options);
  font = loadFont(
    "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
  );
}

function setup() {
  createCanvas(850, 700, WEBGL);

  video = createCapture(VIDEO);
  video.size(850, 700);
  video.hide();
  handPose.detectStart(video, gotHands);

  M = new Mobius(250, 45, 600);
  W = new Walker(M);
  T = new Text();
  G = new Guide();
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(18, 15, 12);

  rotateX(PI / 2.5);
  // rotateAn += 0.0001;
  // rotateZ(rotateAn);

  M.displayMobius();
  W.update();
  W.drawIda(M.points[W.i], M.rWidth);
  T.update();
  T.display();
  G.update(stage, preStage);
  G.draw();

  if (W.i == 50) {
    preStage = 1;
  }
  if (W.i == 90) {
    preStage = 1.5;
  }
  if (W.i == 300) {
    preStage = 2;
  }
  if (W.i == 500) {
    preStage = 3;
  }

  console.log(stage);

  push();
  rotateX(PI / -2.5);
  translate(width - width / 2, -height / 2);
  scale(-1, 1);
  // image(video,0, 0);
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    p1 = hand.keypoints[9];
    detectHand();
    // fill(0, 255, 0);
    // circle(p1.x, p1.y, 20);
    // console.log(p1.x);
    // console.log(p1.y);
  }

  pop();
}

function detectHand() {
  if (
    stage == 0 &&
    preStage == 0 &&
    width - p1.x > width / 2 &&
    width - p1.x < width &&
    p1.y < height / 2
  ) {
    if (stage == 0 && preStage == 0) {
      stage = 1;
      W.stage = 1;
      T.stage = 1;
    }
  } else if (
    width - p1.x > width / 2 + 50 &&
    width - p1.x < width &&
    p1.y > height / 2 + 50 &&
    p1.y < height
  ) {
    if (stage == 1 && preStage == 1 && W.i == 50) {
      W.flip = -1 * W.flip;
      T.stage = 1.5;
      stage = 1.5;
      W.stage = 1.5;
    }
  } else if (
    width - p1.x < width / 2 &&
    p1.y > height / 2 + 50 &&
    p1.y < height
  ) {
    if (stage == 1.5 && preStage == 1.5 && W.i == 90) {
      W.i = 200;
      stage = 2;
      W.stage = 2;
      T.stage = 2;
    }
  } else if (width - p1.x < width / 2 && p1.y < height / 2) {
    if (stage == 2 && preStage == 2 && W.i == 300) {
      W.i = 400;
      stage = 3;
      W.stage = 3;
      T.stage = 3;
    }
  } else if (preStage == 3 && W.i == 500) {
    W.i = 0;
    stage = 0;
    W.stage = 0;
    preStage = 0;
    T.stage = 0;
  }
}
