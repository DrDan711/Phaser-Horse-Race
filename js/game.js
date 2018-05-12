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

var horses;
var cursors;    //used to handle keyboard input

// load asset files for our game
gameScene.preload = function() {
  // load images
  //this.load.image('background', 'assets/background.png');
  //this.load.image('horse', 'assets/player.png');

  this.load.spritesheet('horseBlackSprite', 'assets/horse-black.png', { frameWidth: 128, frameHeight: 128 });
  this.load.spritesheet('horseBrownSprite', 'assets/horse-brown.png', { frameWidth: 128, frameHeight: 128 });
  this.load.spritesheet('horseGoldenSprite', 'assets/horse-golden.png', { frameWidth: 128, frameHeight: 128 });
  this.load.spritesheet('horseGraySprite', 'assets/horse-gray.png', { frameWidth: 128, frameHeight: 128 });
  this.load.spritesheet('horseWhiteSprite', 'assets/horse-white.png', { frameWidth: 128, frameHeight: 128 });

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

  // group of horses
  horses = this.add.group({
    key: 'flibble',    //not sure what this is for, initially assumed it was for the sprite sheet.
    repeat: 4,    //5 horses total
    setXY: {
      x: 40,
      y: 100,
      stepX: 0,
      stepY: 50
    }
  });


  // animations
  this.anims.create({ //run Brown
    key: 'runBrown',
    frames: this.anims.generateFrameNumbers('horseBrownSprite', { start: 52, end: 62 }),
    frameRate: 10,
    repeat: -1      //loop forever
  });
  this.anims.create({ //walk Brown
    key: 'walkBrown',
    frames: this.anims.generateFrameNumbers('horseBrownSprite', { start: 28, end: 31 }),
    frameRate: 5,
    repeat: -1      //loop forever
  });
  this.anims.create({ //stopped Brown
    key: 'stoppedBrown',
    frames: this.anims.generateFrameNumbers('horseBrownSprite', { start: 48, end: 51 }),
    frameRate: 2,
    repeat: 0      //play once?
  });

  this.anims.create({ //run Black
    key: 'runBlack',
    frames: this.anims.generateFrameNumbers('horseBlackSprite', { start: 52, end: 62 }),
    frameRate: 10,
    repeat: -1      //loop forever
  });
  this.anims.create({ //walk Black
    key: 'walkBlack',
    frames: this.anims.generateFrameNumbers('horseBlackSprite', { start: 28, end: 31 }),
    frameRate: 5,
    repeat: -1      //loop forever
  });
  this.anims.create({ //stopped Black
    key: 'stoppedBlack',
    frames: this.anims.generateFrameNumbers('horseBlackSprite', { start: 48, end: 51 }),
    frameRate: 2,
    repeat: 0      //play once?
  });

  this.anims.create({ //run Golden
    key: 'runGolden',
    frames: this.anims.generateFrameNumbers('horseGoldenSprite', { start: 52, end: 62 }),
    frameRate: 10,
    repeat: -1      //loop forever
  });
  this.anims.create({ //walk Golden
    key: 'walkGolden',
    frames: this.anims.generateFrameNumbers('horseGoldenSprite', { start: 28, end: 31 }),
    frameRate: 5,
    repeat: -1      //loop forever
  });
  this.anims.create({ //stopped Golden
    key: 'stoppedGolden',
    frames: this.anims.generateFrameNumbers('horseGoldenSprite', { start: 48, end: 51 }),
    frameRate: 2,
    repeat: 0      //play once?
  });

  this.anims.create({ //run Gray
    key: 'runGray',
    frames: this.anims.generateFrameNumbers('horseGraySprite', { start: 52, end: 62 }),
    frameRate: 10,
    repeat: -1      //loop forever
  });
  this.anims.create({ //walk Gray
    key: 'walkGray',
    frames: this.anims.generateFrameNumbers('horseGraySprite', { start: 28, end: 31 }),
    frameRate: 5,
    repeat: -1      //loop forever
  });
  this.anims.create({ //stopped Gray
    key: 'stoppedGray',
    frames: this.anims.generateFrameNumbers('horseGraySprite', { start: 48, end: 51 }),
    frameRate: 2,
    repeat: 0      //play once?
  });

  this.anims.create({ //run White
    key: 'runWhite',
    frames: this.anims.generateFrameNumbers('horseWhiteSprite', { start: 52, end: 62 }),
    frameRate: 10,
    repeat: -1      //loop forever
  });
  this.anims.create({ //walk White
    key: 'walkWhite',
    frames: this.anims.generateFrameNumbers('horseWhiteSprite', { start: 28, end: 31 }),
    frameRate: 5,
    repeat: -1      //loop forever
  });
  this.anims.create({ //stopped White
    key: 'stoppedWhite',
    frames: this.anims.generateFrameNumbers('horseWhiteSprite', { start: 48, end: 51 }),
    frameRate: 2,
    repeat: 0      //play once?
  });



  let horsesX = horses.getChildren();
  horsesX[0].color = 'Black';
  horsesX[1].color = 'Brown';
  horsesX[2].color = 'Golden';
  horsesX[3].color = 'Gray';
  horsesX[4].color = 'White';


  horses.children.iterate(function (horse) {
    horse.speedx = 0; //think you can just add params to sprites as you want them

    //same speed
    //horse.walkingSpeed = 0.5;
    //horse.runningSpeed = 0.8;

    //random speeds
    horse.walkingSpeed = Math.random() * 1 + 0.1;
    horse.runningSpeed = horse.walkingSpeed + Math.random() * 1 + 0.1;

    horse.anims.play('stopped' + horse.color,true); //initial animation sequence to start with.
  });



  cursors = this.input.keyboard.createCursorKeys();

} //end create


// executed on every frame (60 times per second)
gameScene.update = function() {

  if (cursors.right.isDown)  {    //this seems to get triggered multiple times on a single press, even before I can trap it with a boolean

    horses.children.iterate(function (horse) {
      horse.speedx = horse.runningSpeed;
      horse.anims.play('run' + horse.color, true);
    });
     
  }
  else {

    horses.children.iterate(function (horse) {
      if (horse.speedx > 0) {
        horse.speedx = horse.walkingSpeed;
        horse.anims.play('walk' + horse.color, true);
      }
    });
    
  }

  //move the horses
  horses.children.iterate(function (horse) {
    horse.x += horse.speedx;
  });

};

//http://localhost/phaserPlayArea/horses/default.html