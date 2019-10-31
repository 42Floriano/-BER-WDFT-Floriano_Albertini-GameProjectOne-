let introSong;
let gameMusic;
let gameOverSong;
let currentSong;
let mode;
let button;
let buttonPause;
let buttonPlay;
let buttonRetry;
let gifLoadImg;
let gifCreateImg;

const game = new Game();

function preload() {
  console.log("preload");
  game.preload();
  introSong = loadSound("assets/rickAndMorty/sounds/rickandmortySong.mp3");
  gameMusic = loadSound("assets/rickAndMorty/sounds/gameMusic.mp3");
  gameOverSong = loadSound("assets/rickAndMorty/sounds/rickAndMortyGameOver.mp3");

//   gifLoadImg = loadImage("assets/rickAndMorty/gif/static1.gif");
    gifCreateImg = createVideo('assets/rickAndMorty/videos/static3.mp4');
    // gifCreateImg.resize(100%, 100%);
    // gifCreateImg.hide();
    gifCreateImg.loop();

  buttonPlay = loadImage("assets/rickAndMorty/play.png");
  buttonPause = loadImage("assets/rickAndMorty/pause.png");
  //   buttonRetry = loadImage('assets/rickAndMorty/retryButton.png');
}
let cnv;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  mode = 0;
  button = createImg("assets/rickAndMorty/pause.png", "pause");
  
  button.position(20, 700);
  console.log(button);
  introSong.setVolume(0.5);
  introSong.loop();

  imgIntro = loadImage("assets/rickAndMorty/backgroundIntro.png");
  textFont("Helvetica");

  //   cnv = createCanvas(360, 540);
  //   textSize(21);

  console.log("setup");
  cnv = createCanvas(360, 540);
  centerCanvas();
  game.setup();
  button.mouseClicked(togglePlaying);
}

function togglePlaying() {
  sound.setVolume(0);
  console.log("test");
  if (sound.volume === true) {
    sound.setVolume(0);
    // button.image('assets/rickAndMorty/play.png', "play");
  } else {
    introSong.loop();
    introSong.setVolume(0.5);
    button = buttonPlay;
    // button.image('assets/rickAndMorty/pause.png', "pause");
  }
}

function togglePlaying() {
  sound.setVolume(0);
  console.log("test");
  if (introSong.isPlaying() === true) {
    introSong.pause();
    button = buttonPause;
    // button.image('assets/rickAndMorty/play.png', "play");
  } else {
    introSong.loop();
    introSong.setVolume(0.5);
    button = buttonPlay;
    // button.image('assets/rickAndMorty/pause.png', "pause");
  }
}

function windowResized() {
  centerCanvas();
}

function draw() {
  clear();
  // console.log("draw");
  if (mode === 0) {
    clear();
    // image(gifCreateImg, 0, 0);
    gifCreateImg.position(window.innerWidth / 2 - gifCreateImg.width / 2, window.innerHeight / 2  - gifCreateImg.height /2)
    playRightSong(introSong);
    textSize(25);
    image(imgIntro, 0, 0);
    text(`Press enter to get schwifty !`, 40, 450);
  }
  if (mode === 1) {
    clear();
    // gifCreateImg.remove()
    playRightSong(gameMusic);
    game.draw();
  }

  if (mode === 2) {
    clear();
    playRightSong(gameOverSong);
    textSize(25);
    // image(gifCreateImg, 0, 0);
    // gifCreateImg.loop();
    image(imgIntro, 0, 0);
    buttonRetry = createImg("assets/rickAndMorty/retryButton.png");
    buttonRetry.position(20, 450);
    text(`Game Over`, 40, 450);
  }
}

function playRightSong(sound) {
  // console.log(introSong.isPlaying())
  if (sound === introSong && !introSong.isPlaying()) {
    console.log("test");
    introSong.loop();
    introSong.setVolume(0.2);
    // currentSong = introSong;
  } else if (sound === gameMusic && gameMusic.isPlaying() === false) {
    console.log("GAME MUSIC  ", gameMusic.isPlaying());
    introSong.stop();
    gameOverSong.stop();
    gameMusic.play();
    gameMusic.setVolume(0.4);
    currentSong = gameMusic;
  } else if (sound === gameOverSong && gameOverSong.isPlaying() === false) {
    console.log("END GAME SOUND ", gameOverSong);
    gameMusic.stop();

    currentSong = gameOverSong;
    gameOverSong.play();
    gameOverSong.setVolume(1);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }
  if (keyCode === 38) {
    game.player.shoot();
    console.log("shoot");
  }


  function count (string) {  
    let result = [];
    let current = null;
    let obj = {};
    let count = 0;
    if(string.length() === 0) {
    return obj;
    }else {
    for(let i = 0, i < string.length; i ++){
      result.push(string.charAt(i));
      }
      result.sort();
    
    for (let i = 0; i < result.length; i++) {
            if (result[i] != current) {
                if (count > 0) {
                    document.write(current + ' comes --> ' + count + ' times<br>');
                }
                current = result[i];
                count = 1;
            } else {
                count++;
            }
            if (count > 0) {
            obj[current] = count;
        }
        return obj;
        }
    }
    }




}


