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
let sound1;
let sound2;
let sound3;
let sound4;

function preload() {
  handPose = ml5.handPose(options);
  font = loadFont(
    "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
  );
  sound1 = loadSound("audio/1.mp3");
  sound2 = loadSound("audio/2.mp3");
  sound3 = loadSound("audio/3.mp3");
  sound4 = loadSound("audio/4.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
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

  if (W.i == 100) {
    preStage = 1;
    push();
      translate(0, height*0.2, 0);
      rotateX(PI / -2.5);
      fill(255, 250, 250, 250);
      noStroke();
      textSize(11);
      textAlign(CENTER);
      textFont(font);
      text("What do you want for dinner tonight?", 0, 0);
      text("Whatever you make, I'll eat it — really.", 0, 20);
      pop();
  }
  if (W.i == 180) {
    preStage = 1.5;
    push();
      translate(0, height*0.2, 0);
      rotateX(PI / -2.5);
      fill(255, 250, 250, 250);
      noStroke();
      textSize(11);
      textAlign(CENTER);
      textFont(font);
      text("Why are you always so careless about these things?", 0, 0);
      text("Fine fine, just make a whole fish then.", 0, 20);
      pop();
  }
  if (W.i == 600) {
    preStage = 2;
      push();
      translate(0, height*0.2, 0);
      rotateX(PI / -2.5);
      fill(255, 250, 250, 250);
      noStroke();
      textSize(11);
      textAlign(CENTER);
      textFont(font);
      text("What's for lunch — delivery or go out?", 0, 0);
      text("Doesn't matter, somewhere near the office is fine.", 0, 20);
      pop();
  }
  if (W.i == 1000) {
    preStage = 3;
      push();
      translate(0, height*0.2, 0);
      rotateX(PI / -2.5);
      fill(255, 250, 250, 250);
      noStroke();
      textSize(11);
      textAlign(CENTER);
      textFont(font);
      text("Hey, want to grab some snacks after school?", 0, 0);
      text("Whatever, but I need to be home for dinner.", 0, 20);
      pop();
  }

  // console.log(stage);

  push();
  rotateX(PI / -2.5);
  translate(width / 2, -height / 2, 1);
  scale(-1, 1);
  // image(video,0, 0);
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    p1 = hand.keypoints[9];
    detectHand();
    noFill();
    fill(255, 250, 50, 80);
    // circle(p1.x, p1.y, 30);
    triangle(p1.x-30, p1.y+25, p1.x-25, p1.y+40, p1.x-20, p1.y+25);
    triangle(p1.x-25, p1.y+30, p1.x-10, p1.y+25, p1.x-25, p1.y+20);
    triangle(p1.x-30, p1.y+25, p1.x-25, p1.y+10, p1.x-20, p1.y+25);
    triangle(p1.x-25, p1.y+30, p1.x-40, p1.y+25, p1.x-25, p1.y+20);

    console.log(p1.x, p1.y);
    // console.log(p1.y);


  }

  pop();

  //test
  // push();
  // rotateX(PI / -2.5);
    // fill(255, 0, 0);
    // circle(250 , 170, 30);
    // pop();
}

function detectHand() {
  if (
    stage == 0 &&
    preStage == 0 &&
    p1.x > width*0.2 &&
    p1.x < width*0.24 &&
    p1.y > height*.045 &&
    p1.y < height*0.5
  ) {
    if (stage == 0 && preStage == 0) {
      stage = 1;
      W.stage = 1;
      T.stage = 1;
      sound1.play();
    }
  } else if (
   p1.x > width*0.17 &&
    p1.x < width*0.2 &&
    p1.y > height*0.47 &&
    p1.y < height*0.51
  ) {
    if (stage == 1 && preStage == 1 && W.i == 100) {
      W.flip = -1 * W.flip;
      T.stage = 1.5;
      stage = 1.5;
      W.stage = 1.5;
      sound2.play();
    }
  } else if (p1.x > width*0.24 && p1.x < width*0.27 && p1.y > height*0.71 && p1.y < height*0.78) {
    if (stage == 1.5 && preStage == 1.5 && W.i == 180) {
      W.i = 400;
      stage = 2;
      W.stage = 2;
      T.stage = 2;
      sound3.play();
    }
  } else if (p1.x > width*0.82 && p1.x < width*0.87 && p1.y > height*0.36 && p1.y < height*0.44) {
    if (stage == 2 && preStage == 2 && W.i == 600) {
      W.i = 800;
      stage = 3;
      W.stage = 3;
      T.stage = 3;
      sound4.play();
    }
  } else if (preStage == 3 && W.i == 1000) {
    W.i = 0;
    stage = 0;
    W.stage = 0;
    preStage = 0;
    T.stage = 0;
  }
}
