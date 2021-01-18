var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg,endImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {

  createCanvas(400, 600);
  // Moving background
  path = createSprite(200, 300);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70, 530, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  
  boy.setCollider("rectangle",0,0,1000,1000);
  boy.debug=false;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  if (gameState===PLAY){
  boy.x = World.mouseX;

  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > 600) {
    path.y = height / 2;
  }

  var rand = Math.round(random(1,4));
  switch (rand) {
  case 1: createCash();
         break;
  case 2: createDiamonds();
         break;
  case 3: createSword();
         break;
  case 4: createJwellery();
         break; 
  default: break;  
      
  }          
  if (cashG.isTouching(boy)) {
    treasureCollection=treasureCollection+50
    cashG.destroyEach();
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection=treasureCollection+150
  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection=treasureCollection+100
  } else {
    if (swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      gameState=END;
    }
  }
  }
  if (gameState===END){
    path.velocityY=0;
    boy.addAnimation("SahilRunning",endImg);
    boy.x=200;
    boy.y=300;
    boy.scale=0.7
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 200;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 200;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 200;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 200;
    swordGroup.add(sword);
  }
}