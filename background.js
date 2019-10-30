class Background {
  constructor() {
    this.xGrid = 0;
  }
  preload() {
    console.log("background preload");
    this.bg = loadImage("assets/screenItems/background.jpg");
  }

  draw() {
    image(this.bg, this.xGrid, 0, width); //width comes from p5;
  }
}
