let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };


function preload() {
  faceMesh = ml5.faceMesh(options);
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  for(let i=0; i<faces.length; i++){
    let face = face[i];
    let p1 = face.keypoints[0]; //top
    let p2 = face.keypoints[0]; //bottom
    fill(0, 255, 0);
    circle(p1.x, p1.y, 5);
    circle(p2.x, p2.y, 5);
    let d = dist(p1.x, p1.y, p2.x, p2.y);
    console.log(d);
    let op = map(d, 10, 60, 0, 255);
    background(0, op);
  }
  // background(220);
  // push();
  // translate(width, 0);
  // scale(-1,1);
  // image(video, 0, 0, width, height);
  // pop();
  // for (let i = 0; i < faces.length; i++) {
  //   let face = faces[i];
  //   for (let j = 0; j < face.keypoints.length; j++) {
  //     let keypoint = face.keypoints[j];
  //     fill(0, 255, 0);
  //     noStroke();
  //     circle(keypoint.x, keypoint.y, 5);
  //   }
  // }
}

