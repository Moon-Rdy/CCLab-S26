let M;
let preStage = 0;
let i = 0;
let stage = 0;

function setup() {
  createCanvas(850, 750, WEBGL);
  M = new Mobius(250, 45, 600);
  W = new Walker(M);
}

function draw() {
  background(0);

  rotateX(PI / 2.5);
  rotateZ(frameCount * 0.0001);

  M.displayMobius();
  W.update();
  W.drawIda(M.points[W.i], M.rWidth);
  
   if (W.i == 90) {
    preStage = 1;
  }
  if (W.i == 300) {
    preStage = 2;
  }
  if (W.i == 500) {
    preStage = 0;
    stage = 0;
    W.stage = 0;
    W.i = 0;
  }
  
  // console.log(W.i);
  // console.log(stage);
  console.log(W.stage);
  
}

  function mousePressed() {
    if (stage == 0 && preStage == 0) {
      stage = 1;
      W.stage = 1;
    } else if (stage == 1 && preStage == 1 && W.i == 90) {
      W.i = 200;
      stage = 2;
      W.stage = 2;
    } else if (stage == 2 && preStage == 2 && W.i == 300) {
      W.i = 400;
      stage = 3;
      W.stage = 3;
    }
  }
