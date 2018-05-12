// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
 
// our game's configuration
let config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: 800, // game width
  height: 400, // game height
  scene: gameScene // our newly created scene
};
 
// create the game, and pass it the configuration
let game = new Phaser.Game(config);

var horse;
var cursors;    //used to handle keyboard input

// load asset files for our game
gameScene.preload = function() {
  // load images
  //this.load.image('background', 'assets/background.png');
  //this.load.image('horse', 'assets/player.png');
  this.load.spritesheet('horseBrownSprite', 'assets/horse-brown.png', { frameWidth: 128, frameHeight: 128 });
};

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {

}


 
// executed once, after assets were loaded
gameScene.create = function() {
   // background
   //this.add.sprite(0, 0, 'background');     //places centre of image at 0,0

   // background
  //let bg = this.add.sprite(0, 0, 'background');
   // change origin to the top-left of the sprite
  //bg.setOrigin(0,0);

  horse = this.add.sprite(40, this.sys.game.config.height / 2, 'horseBrownSprite');
  //this.player.setScale(0.5);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('horseBrownSprite', { start: 52, end: 62 }),
    frameRate: 10,
    repeat: -1      //loop forever
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('horseBrownSprite', { start: 28, end: 31 }),
    frameRate: 5,
    repeat: -1      //loop forever
  });


  this.anims.create({
    key: 'stopped',
    frames: this.anims.generateFrameNumbers('horseBrownSprite', { start: 48, end: 51 }),
    frameRate: 2,
    repeat: 0      //play once?
  });


  horse.speedx = 0; //think you can just add params to sprites as you want them

  horse.anims.play('stopped',true); //initial animation sequence to start with.

  cursors = this.input.keyboard.createCursorKeys();

}


// executed on every frame (60 times per second)
gameScene.update = function() {
   
  if (cursors.right.isDown)  {    //this seems to get triggered multiple times on a single press, even before I can trap it with a boolean
      horse.speedx = 0.6;
      horse.anims.play('run', true);
  }
  else {
    if (horse.speedx > 0) {
      horse.speedx = 0.2;
      horse.anims.play('walk', true);
    }
  }

  //horse.anims.play('run', true);
  horse.x += horse.speedx;
};

//http://localhost/phaserPlayArea/horses/default.html