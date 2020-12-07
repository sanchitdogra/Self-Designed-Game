const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engineObj, world;
var ground;
var player;
var invisibleGround;
var playerWalkImg;
var jumpState = 0;
var bgSprite;
var gameState=0;
var carGroup;
var robo;

function preload(){

  playerStandImg=loadAnimation("boy_standing_01.png");
  playerWalkImg=loadAnimation("boy_walking_01.png","boy_walking_02.png","boy_walking_03.png","boy_walking_04.png","boy_walking_05.png","boy_walking_06.png");
  playerJumpAnimation = loadAnimation("boy_jumping_01.png","boy_jumping_03.png","boy_jumping_04.png","boy_jumping_05.png","boy_jumping_06.png","boy_jumping_07.png","boy_jumping_08.png");
  playerSlideAnimation = loadAnimation("boy_sliding_01.png","boy_sliding_02.png","boy_sliding_03.png","boy_sliding_04.png","boy_sliding_05.png","boy_sliding_06.png","boy_sliding_07.png");
  backgroundImg = loadImage("bg.jpg");
  carImg = loadImage("obstacle1.png");
  img2 = loadImage("nuke.png");
  roboImg = loadImage("robo_attacking_1.png");
  roboWalk = loadAnimation("robo_attacking_1.png","robo_walking_2.png","robo_walking_3.png");

}
function setup() 
{
      createCanvas(displayWidth, displayHeight-120);
      engineObj = Engine.create();
      world = engineObj.world;

      carGroup = new Group();
    


      ground = new Ground(displayWidth/2-20,displayHeight-200, displayWidth*20,10)
      player  = createSprite(displayWidth/2-550, displayHeight-300, 100,100);
     
  
      player.addAnimation("standing",playerStandImg);
      player.addAnimation("walking",playerWalkImg);
      player.addAnimation("jumping",playerJumpAnimation);
      player.addAnimation("sliding",playerSlideAnimation);
      player.setCollider("circle", 0,0,40);
      //robo.addAnimation("walking",roboWalk);
  
      invisibleGround = createSprite(displayWidth/2-20,displayHeight-200, displayWidth*20,10);
      invisibleGround.visible=true;

      player.debug = true;
}

function draw() 
{
  background(backgroundImg);  

  Engine.update(engineObj);

  ground.display();

  if(player.isTouching(carGroup))
  {
    //playSound("dying.mp3");
    gameState = 2;        
    carGroup.destroyEach();
  }

  carGroup.bounceOff(invisibleGround);

  if(player.x > 1650)
  {
    gameState = 1;
  }

  if(gameState === 1)
    {
    player.x = displayWidth/2-550;
    background(img2);
    spawnRobo();
    }


 console.log(gameState);

 console.log(player.x);
 
  playerMovement();
  player.velocityY=player.velocityY+0.5
  player.collide(invisibleGround);

spawnCar();

 if(gameState===2){
   console.log("gameEnded");
   player.visible = false;
 }

  
  drawSprites();
}

function playerMovement()
{
  if(keyWentDown(RIGHT_ARROW))
  {
    player.velocityX = 20;
    player.changeAnimation("walking",playerWalkImg);
  }

  if(keyWentUp(RIGHT_ARROW))
  {
    player.velocityX = 0;
    player.changeAnimation("standing",playerStandImg);
  }
  if(keyWentDown("space")){
    player.velocityY=-10;
    player.changeAnimation("jumping",playerJumpAnimation);
    jumpState = 1;
  }
  if(jumpState === 1&&player.isTouching(invisibleGround)){
    player.changeAnimation("standing",playerStandImg);
    jumpState =0;
  }
  if(keyWentDown(DOWN_ARROW)){
    player.changeAnimation("sliding",playerSlideAnimation);
  
  }
  if(keyWentUp(DOWN_ARROW)){
    player.changeAnimation("standing",playerStandImg);
  
  }
}

function spawnCar()
{
  if(frameCount %100 === 0 && gameState ===0)
  {
    var rand = random(50,displayWidth-100);
    var car = createSprite(rand, -50,50,50);
    car.velocityY = 8; 
    car.addImage(carImg);
    carGroup.add(car);
    car.debug = true;
  }
}

function spawnRobo()
{
  robo = createSprite(displayWidth/2+500,displayHeight-100,50,50);
  robo.addImage("normal",roboImg);
  robo.scale = 2;
  if(keyWentDown(RIGHT_ARROW))
  {
    //robo.changeAnimation("walking",roboWalk);
    robo.velocityX = -10;
  }
}

