let introSong;
let gameMusic;
let gameOverSong;
let currentSong;
let mode;
let button;
let buttonPause
let buttonPlay

const game = new Game();


function preload() {
  console.log("preload");
  game.preload();
  introSong = loadSound('assets/rickAndMorty/sounds/rickandmortySong.mp3');
  gameMusic = loadSound('assets/rickAndMorty/sounds/rickandmortySong.mp3');
  gameOverSong = loadSound('assets/rickAndMorty/sounds/rickAndMortyGameOver.mp3');
  buttonPlay = loadImage('assets/rickAndMorty/play.png');
  buttonPause  = loadImage('assets/rickAndMorty/pause.png')
    
}
let cnv;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
    mode = 0;
    // slider = createSlider();
    // button = createButton("pause");
    
    button = createImg('assets/rickAndMorty/pause.png', "pause");
// button = buttonPlay
    button.position(20, 700);
    console.log(button)
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

function togglePlaying(){
    sound.setVolume(0);
    console.log("test");
    if(sound.volume === true){
        sound.setVolume(0);
        // button.image('assets/rickAndMorty/play.png', "play");
    } else {
        introSong.loop();
        introSong.setVolume(0.5);
        button = buttonPlay
        // button.image('assets/rickAndMorty/pause.png', "pause");
    }
}

function togglePlaying(){
    sound.setVolume(0);
    console.log("test");
    if(introSong.isPlaying() === true){
        introSong.pause();
        button = buttonPause
        // button.image('assets/rickAndMorty/play.png', "play");
    } else {
        introSong.loop();
        introSong.setVolume(0.5);
        button = buttonPlay
        // button.image('assets/rickAndMorty/pause.png', "pause");
    }
}

function windowResized() {
    centerCanvas();
}

function draw() {
    console.log(button)
    clear();
    // console.log("draw");
  if(mode === 0){
    clear();
        playRightSong(introSong);
        textSize(25); 
        image(imgIntro, 0, 0,); 
      text(`Press enter to get schwifty !`,40 , 450);
  }
  if(mode === 1) {
      clear();
      playRightSong(gameMusic);
        game.draw();
  }
  
  if(mode === 2) {
    clear();
    playRightSong(gameOverSong);
    textSize(25); 
    image(imgIntro, 0, 0,); 
    text(`Game Over`,40 , 450);
}
  
  
}

function playRightSong(sound){
    // console.log(introSong.isPlaying())
    if(sound === introSong && !introSong.isPlaying() ) {
        console.log("test");
        introSong.loop();
        // currentSong = introSong;
} else if(sound === gameMusic && gameMusic.isPlaying() === false) {
    console.log("GAME MUSIC  ",gameMusic.isPlaying())
        introSong.stop();
        gameOverSong.stop();
        gameMusic.play();
        currentSong = gameMusic;
} else if(sound === gameOverSong && gameOverSong.isPlaying() === false) {
    console.log('END GAME SOUND ', gameOverSong)
        gameMusic.stop();
        currentSong = gameOverSong;
        gameOverSong.play();
    }
}

function keyPressed() {
    if(keyCode === ENTER) {
        mode = 1;
    }
  if (keyCode === 38) {
    game.player.shoot();
    console.log("shoot")
  }
}
