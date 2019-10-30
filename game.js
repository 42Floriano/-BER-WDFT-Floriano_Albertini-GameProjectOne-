
class Game {
  constructor() {
    // background
    // player
    // obstacles
    // points
    this.background = new Background();
    this.player = new Player();
    this.laser = new Laser();
    this.obstacles = [];
    this.points = [];
    // this.lasers = [];
  }

  preload() {
    console.log("game preload");
    this.background.preload();
    this.player.preload();
    this.laser.preload();

  }
  setup() {
    console.log("game setup");
    this.player.setup();

    // this.laser.setup();
  }
  draw() {
    this.background.draw();
    this.player.draw();



    if (frameCount > 240 && frameCount % 60 === 0) {
    //   console.log("create new obstacle");
      this.obstacles.push(new Obstacle());
    }

    this.obstacles.forEach(
      function(obstacle, index) {
        // obstacle.preload();
        // obstacle.setup();
        obstacle.draw();

        if (obstacle.y - obstacle.height > height) {
          //remove obstacle
          this.obstacles.splice(index, 1);
        }

        if (this.isCollision(obstacle, this.player)) {
          console.log("GAME OVER");
          mode = 2;
            noLoop();
        }
      }.bind(this)
    );





    if (
      frameCount > 240 &&
      frameCount % (120 + -Math.floor(Math.random() * 60)) === 0
    ) {
    //   console.log("create new point");
      this.points.push(new Point());
    }

    this.points.forEach(
      function(point, index) {
        // point.preload();
        // point.setup();
        point.draw();

        if (point.y - point.height > height) {
          //remove point
          this.points.splice(index, 1);
        }

        if (this.isCollisionPoint(point, this.player)) {
          this.points.splice(index, 1);
          this.player.score++;
        }
      }.bind(this)
    );
    console.log(this.player.score);
  }

  isCollision(obstacle, player) {
    if (
      player.x + player.width / 1.3 < obstacle.x ||
      obstacle.x + player.width / 1.3 < player.x 
    ) {
        // console.log("salut" +player.width)
      return false;
    }
    if (
      player.y > obstacle.y + obstacle.height / 1.3 ||
      obstacle.y > player.y + player.height / 1.3
    ) {
      return false;
    }
    return true;
  }

  isCollisionPoint(point, player) {
    if (
      player.x + player.width / 1.4 < point.x ||
      point.x + player.width / 1.4 < player.x
    ) {
      return false;
    }
    if (
      player.y > point.y + point.height / 1.4 ||
      point.y > player.y + player.height / 1.4
    ) {
      return false;
    }
    return true;
  }

}
