let introSong;
let gameMusic;
let gameOverSong;
let currentSong;
let mode;
let buttonMute;
let buttonRetry;
let gifLoadImg;
let gifCreateImg;
let muted = false;
let ammoImg;
let scoreImg;

const game = new Game();

function preload() {
  console.log("preload");
  game.preload();
  introSong = loadSound("assets/rickAndMorty/sounds/rickandmortySong.mp3");
  gameMusic = loadSound("assets/rickAndMorty/sounds/gameMusic.mp3");
  gameOverSong = loadSound(
    "assets/rickAndMorty/sounds/rickAndMortyGameOver.mp3"
  );
  ammoImg = loadImage("assets/rickAndMorty/ammoTotal.png");
  scoreImg = loadImage("assets/rickAndMorty/score.png");
}
let cnv;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  console.log("setup");
  mode = 0;
  buttonMute = createImg("assets/rickAndMorty/mute.png", "pause");
  buttonMute.position(20, 750);
  buttonRetry = createImg("assets/rickAndMorty/retry.png", "pause");
  buttonRetry.position(90, 750);
  introSong.setVolume(0.5);
  introSong.loop();
  imgIntro = loadImage("assets/rickAndMorty/backgroundIntro.png");
  textFont("Helvetica");
  cnv = createCanvas(360, 540);
  centerCanvas();
  game.setup();
  buttonMute.mouseClicked(muteAllSounds);
  buttonRetry.mouseClicked(replay);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  clear();
  // console.log("draw");
  if (mode === 0) {
    clear();
    playRightSong(introSong);
    textSize(25);
    image(imgIntro, 0, 0);
    text(`Press enter to get schwifty !`, 40, 450);
  }
  if (mode === 1) {
    clear();
    playRightSong(gameMusic);
    game.draw();
    textSize(20);
    fill(169, 209, 239);
    image(scoreImg, 7, 0);
    text(' '+ game.player.score, 59, 30);
    textSize(30);
    fill(169, 209, 239);
    image(ammoImg, 7, 490);
    text(' '+ game.player.ammo, 59, 522);
  }

  if (mode === 2) {
    clear();
    playRightSong(gameOverSong);
    textSize(25);
    image(imgIntro, 0, 0);
    text(`Game Over`, 40, 450);
  }
}

function playRightSong(sound) {
  if (sound === introSong && !introSong.isPlaying()) {
    console.log("test");
    introSong.loop();
    introSong.setVolume(0.4);
  } else if (sound === gameMusic && gameMusic.isPlaying() === false) {
    console.log("GAME MUSIC  ", gameMusic.isPlaying());
    introSong.stop();
    gameOverSong.stop();
    gameMusic.setVolume(0.4);
    gameMusic.play();
    currentSong = gameMusic;
  } else if (sound === gameOverSong && gameOverSong.isPlaying() === false) {
    console.log("END GAME SOUND ", gameOverSong);
    gameMusic.stop();
    currentSong = gameOverSong;
    gameOverSong.setVolume(1);
    gameOverSong.play();
  }
}

function muteAllSounds() {
  if (muted === true) {
    introSong.setVolume(0.4);
    gameMusic.setVolume(0.4);
    gameOverSong.setVolume(1);
    coinsSound.setVolume(1);
    mortySound.setVolume(1);
    popSound.setVolume(1);
    laserSound.setVolume(1);
    muted = false;
  } else {
    introSong.setVolume(0);
    gameMusic.setVolume(0);
    gameOverSong.setVolume(0);
    coinsSound.setVolume(0);
    mortySound.setVolume(0);
    popSound.setVolume(0);
    laserSound.setVolume(0);
    muted = true;
  }
}
function replay() {
  console.log("tried to reload, biotch");
  mode = 1;
  game.obstacles = [];
  game.points = [];
  game.difficulty = 60;
  speed = 4;
  game.player.ammo = 5;
  game.player.score = 0;
}

function keyPressed() {
  if (keyCode === 77) {
    muteAllSounds();
  }
  if (keyCode === 82) {
    replay();
  }
  if (keyCode === ENTER) {
    mode = 1;
  }
  if (keyCode === 38) {
    game.player.shoot();
    console.log("shoot");
  }
}
