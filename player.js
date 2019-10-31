let popSound;
let laserSound;
class Player {
  constructor() {
    this.x = 0;
    this.velocity = 0;
    this.score = 0;
    this.ammo = 5;
    this.lasers = [];
    this.laser = new Laser();
  }

  preload() {
    popSound = loadSound("assets/rickAndMorty/sounds/popPiece.mp3");
    laserSound = loadSound("assets/rickAndMorty/sounds/laserShot.mp3");
    this.laser.preload();
    console.log("player preload");
    this.img = loadImage("assets/rickAndMorty/playerMorty.png");
  }

  setup() {
    console.log("player setup");
    this.width = this.img.width - 10;
    this.height = this.img.height - 15;
    this.y = height - this.height - 10;
    this.originalY = this.y;
    this.x = width / 2 - this.width / 2;
    this.borderR = width - this.width - 5;
    this.borderL = 5;
    this.laser.setup();
  }

  draw() {
    if (keyIsDown(37) && this.x >= this.borderL) {
      // gauche
      this.x -= 6;
    }
    if (keyIsDown(39) && this.x <= this.borderR) {
      //droite
      this.x += 6;
    }

    if (this.ammo === 0) {
      setTimeout(function() {
        game.player.ammo = 5;
        console.log("reloaded", game.player.ammo);
      }, 3000);
    }

    image(this.img, this.x, this.y, this.width, this.height);

    this.lasers.forEach(
      function(laser, index) {
        laser.draw();
        game.obstacles.forEach(function(obstaclel, indexO) {
          if (laser.y <= 0 - laser.height) {
            //remove point
            game.player.lasers.splice(index, 1);
            console.log(game.player.lasers.length);
          }

          if (game.player.isCollisionLaser(laser, game.obstacles[indexO])) {
            game.player.lasers.splice(index, 1);
            game.obstacles.splice(indexO, 1);
            game.player.score++;
            popSound.play();
          }
        });
      }.bind(this)
    );
  }

  shoot() {
    if (this.ammo > 0) {
      const laser = new Laser(this.laser.img);
      laser.setup(this.x, this.height);
      this.lasers.push(laser);
      this.ammo -= 1;
      laserSound.play();
      console.log(this.ammo);
    } else {
      console.log("RELOADING");
    }
  }

  isCollisionLaser(obstacle, laser) {
    if (laser.x + 30 < obstacle.x || obstacle.x + 30 < laser.x) {
      return false;
    }
    if (laser.y > obstacle.y + obstacle.height || obstacle.y > laser.y + 20) {
      return false;
    }
    return true;
  }
}
