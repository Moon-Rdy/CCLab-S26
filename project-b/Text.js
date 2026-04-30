class Text {
  constructor() {
    this.imgs = [];
    this.shidan = [1, 11, 12, 13, 14, 17, 18, 19, 22];
    this.qiuqi = [2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 20, 21];
    this.shidanAway = [11, 13, 19, 22];
    this.qiuqiAway = [7, 9, 10, 15, 20, 21];
    for (let i = 1; i <= 22; i++) {
      this.imgs.push(loadImage(`images/${i}.png`));
    }
    this.t = 0;
    this.stage = 0;
    this.sdOpa = 50; //是但透明度
    this.qqOpa = 50; //求其透明度
  }

  update() {
    this.t += 0.02;

    if (this.stage == 0) {
      this.sdOpa = map(sin(this.t), -1, 1, 20, 50);
      this.qqOpa = map(sin(this.t * 0.8), -1, 1, 20, 50);
    } else if (this.stage == 1) {
      this.sdOpa = lerp(this.sdOpa, map(sin(this.t), -1, 1, 180, 255), 0.01);
      this.qqOpa = lerp(
        this.qqOpa,
        map(sin(this.t * 0.8), -1, 1, 30, 70),
        0.01
      );
    } else if (this.stage == 1.5) {
      this.sdOpa = map(sin(this.t), -1, 1, 180, 255);
      this.qqOpa = map(sin(this.t * 0.8), -1, 1, 180, 255);
    } else if (this.stage == 2) {
      this.sdOpa = 170;
      this.qqOpa = 170;
    } else if (this.stage == 3) {
      this.sdOpa = 0;
      this.qqOpa = 0;
    }
  }

  display() {
    let sdFloat = map(sin(this.t), -1, 1, 45, 55);
    let qqFloat = map(sin(this.t * 0.7), -1, 1, 95, 105);
    push();
    rotateX(-PI / 2.5);
    translate(-width / 2, -height / 2);

    if (this.stage == 0 || this.stage == 1 || this.stage == 1.5) {
      for (let i of this.shidan) {
        tint(255, this.sdOpa);
        image(this.imgs[i - 1], 50, sdFloat, 300, 100);
      }
      for (let i of this.qiuqi) {
        tint(255, this.qqOpa);
        image(this.imgs[i - 1], width / 2 + 50, qqFloat, 300, 100);
      }
    } else if (this.stage == 2 || this.stage == 3) {
      for (let i of this.shidanAway) {
        tint(255, this.sdOpa);
        image(this.imgs[i - 1], 50, sdFloat, 300, 100);
      }
      for (let i of this.qiuqiAway) {
        tint(255, this.qqOpa);
        image(this.imgs[i - 1], width / 2 + 50, qqFloat, 300, 100);
      }
    }

    pop();
  }
}
