
var monkey , monkey_running, monkeysad;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var forest,forestImage;
var gameover,gameoverImage,restart,resatrtImage;

function preload(){
  gameSound = loadSound("gameSound.mp3");
  hhhSound = loadSound("hhh.mp4");
  gggSound = loadSound("ggg.mp4");
  eeeSound = loadSound("eee.mp4");
  gameoverSound = loadSound("preview.mp3")
  
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("ground.png"); 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stick.png");
  forestImage = loadImage("forest.png");
  restartImage = loadImage("replay3.png");
  gameoverImage = loadImage("gameover2.png");
  monkeysad = loadImage("monkeysad.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("sad", monkeysad);
  
    
  ground = createSprite(300,100,600,600);
  ground.scale = 0.5;
  ground.addAnimation("ground", groundImg);
  monkey.depth = ground.depth;
  monkey.depth = monkey.depth+1;
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
  gameover = createSprite(300,100,40,30);
  gameover.scale = 0.2;
  gameover.addImage(gameoverImage);
  
  restart = createSprite(300,200,50,40);
  restart.scale = 0.3;
  restart.addImage(restartImage);
  
  gameSound.play();
  
  score = 0;
  bananaScore = 0 ;
}

function draw(){
  background("black");
  fill("red");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("Score: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8

  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
      hhhSound.play();
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      background("black");
      gameoverSound.play();

    }
    

    
  }
  
  if (gameState === END){
    gameover.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("sad", monkeysad);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }

    
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
}

function reset(){
 gameState = PLAY;
 gameover.visible = false;
 restart.visible = false;
 monkey.changeAnimation("monkey", monkey_running);

 
 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();
  score = 0;
  bananaScore = 0 ;
}

function bananas(){
  if (frameCount%50 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*4/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%100 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*3/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






