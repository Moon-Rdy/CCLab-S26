let c = [];
let r = [];
function setup() {
  createCanvas(400, 400);
}

// function preload(){
//   thunder = loadSound("thunder.mp3");
// }

function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(0.5, 1)));
}
function draw() {
  background(220);
  // if(mouseIsPressed){
  //   r.push(new Rain(c[i].x, c[i].y));
  // }
  for (let i = 0; i < r.length; i++) {
    r[i].updateRain();
    r[i].displayRain();
    if(r[i].isOut){
      r.splice(i, 1);
    }
  }
  console.log(r.length);

  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      if ( i != j){
    c[i].checkcollision(c[i]);
      }
    }
    if(this.isRaining){
    r.push(new Rain(c[i].x, c[i].y));
  }
    c[i].update();
    c[i].display();
    if (c[i].isOut) {
      c.splice(i, 1);
    }
  console.log(c.length);
    }
}


