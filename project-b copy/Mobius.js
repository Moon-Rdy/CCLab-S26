class Mobius {
  
  constructor() {
    this.points = [];
    this.numSegments = 1200;
    this.r = 400;
    this.rWidth = 60;

    this.drawMobius();
  }
  drawMobius() {
    for (let i = 0; i <= this.numSegments; i++) {
      let angle = map(i, 0, this.numSegments, 0, TWO_PI);
      let twist = angle / 2;
      let x0 = cos(angle) * this.r;
      let y0 = sin(angle) * this.r;
      let z0 = 0;
      let point = {};
      point.x0 = x0;
      point.y0 = y0;
      point.z0 = z0;
      point.angle = angle;
      point.twist = twist;
      this.points.push(point);
    }
  }

  displayMobius() {
    noFill();
    strokeWeight(1);

    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i];
      let p2 = this.points[i + 1];
      
      //p1
      let nx1 = cos(p1.twist) * cos(p1.angle);
      let ny1 = cos(p1.twist) * sin(p1.angle);
      let nz1 = sin(p1.twist);

      let x1a = p1.x0 + nx1 * this.rWidth;
      let y1a = p1.y0 + ny1 * this.rWidth;
      let z1a = p1.z0 + nz1 * this.rWidth;

      let x1b = p1.x0 - nx1 * this.rWidth;
      let y1b = p1.y0 - ny1 * this.rWidth;
      let z1b = p1.z0 - nz1 * this.rWidth;

      //p2
      let nx2 = cos(p2.twist) * cos(p2.angle);
      let ny2 = cos(p2.twist) * sin(p2.angle);
      let nz2 = sin(p2.twist);

      //let x2a = p2.x0 + nx2 * this.rWidth;
      //let y2a = p2.y0 + ny2 * this.rWidth;
      //let z2a = p2.z0 + nz2 * this.rWidth;

      //let x2b = p2.x0 - nx2 * this.rWidth;
      //let y2b = p2.y0 - ny2 * this.rWidth;
      //let z2b = p2.z0 - nz2 * this.rWidth;

      if (i % 4 == 0) {
        stroke(150);
      } else if(i % 2 == 0){
        stroke(80);
      }else {
        stroke(0);
      }
      //horizontal
      beginShape();
      vertex(x1a, y1a, z1a);
      vertex(x1b, y1b, z1b);
      endShape();

      //// vertical
      // stroke(100);
      // line(x1a, y1a, z1a, x2a, y2a, z2a);
      // line(x1b, y1b, z1b, x2b, y2b, z2b);
    }
  }
}
