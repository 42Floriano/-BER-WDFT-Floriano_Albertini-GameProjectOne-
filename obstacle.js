let speed = 4;
class Obstacle {
  //
  constructor() {
    this.y = 0; // canvas height
    this.img = loadImage("assets/rickAndMorty/obstacleSMWYG.png");
    this.width = this.img.width - 10;
    this.height = this.img.height - 15;
    this.borderR = width - this.width - 50;
    this.borderL = 5;
    this.x = random(this.borderL, this.borderR);
  }

  preload() {
    console.log("obstacle preload");
  }

  setup() {
    console.log("obstacle setup");
  }



  draw() {
    image(this.img, this.x, this.y, 63, 69);
    if (frameCount > 240 && frameCount % 300  === 0 && speed < 14 ) {
      speed +=0.05;
    }
    this.y += speed;
  }
}
