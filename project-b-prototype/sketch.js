let M;

function setup() {
  createCanvas(1480, 940, WEBGL);
  M = new Mobius(250, 45, 600);
}

function draw() {
  background(0);

  rotateX(PI / 2.5);
  rotateZ(frameCount * 0.0003);

  M.displayMobius();
}