let M;
let W;
let T;
let G;
let preStage = 0;
let i = 0;
let stage = 0;
// let rotateAn = 0;

let font;
let p1;
let sound1;
let sound2;
let sound3;
let sound4;

function preload() {
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

  M = new Mobius(250, 45, 600);
  W = new Walker(M);
  T = new Text();
  G = new Guide();
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
    translate(0, height * 0.2, 0);
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
    translate(0, height * 0.2, 0);
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
    translate(0, height * 0.2, 0);
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
    translate(0, height * 0.2, 0);
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
  console.log(stage);

  if (stage == 1 && preStage == 1 && !sound1.isPlaying()) {
    sound2.play();
    W.flip = -1 * W.flip;
    T.stage = 1.5;
    stage = 1.5;
    W.stage = 1.5;
  }
  if (stage == 1.5 && preStage == 1.5 && !sound2.isPlaying()) {
    sound3.play();
    W.i = 400;
    stage = 2;
    W.stage = 2;
    T.stage = 2;
  }
  if (stage == 2 && preStage == 2 && !sound3.isPlaying()) {
    sound4.play();
    W.i = 800;
    stage = 3;
    W.stage = 3;
    T.stage = 3;
  }
  if (stage == 3 && preStage == 3 && !sound4.isPlaying()) {
    W.i = 0;
    stage = 0;
    W.stage = 0;
    preStage = 0;
    T.stage = 0;
  }

  pop();
}

function mousePressed() {
  if (stage == 0 && preStage == 0) {
    sound1.play();
    stage = 1;
    W.stage = 1;
    T.stage = 1;
  }
}

