var gameState;

var score

var endScreen, endScreenImg, openingScreen, openingScreenImg;

var player, playerImage;

var building1, building2, building3;

var deathWall1, deathWall2, deathWall3;

var building1img, building2img, building3img;

var music, soundTrack

var backGround, backGroundImage
function preload(){
building1img = loadImage("building1img.png");
building2img = loadImage("building2img.png");
building3img = loadImage("building3img.png");

endScreenImg = loadImage("Untitled drawing.png");
openingScreenImg = loadImage("openingScreen.png");

coinImg = loadImage("coin.png");

  building1 = loadImage("Building1.png");
  building2 = loadImage("Building2.png");
  building3 = loadImage("building3.png");
 
music = loadSound("Mickey Never Came Back Theme.mp3")

  playerImage = loadAnimation("running1.png", "running2.png", "running3.png", "running4.png", "running5.png", "running6.png", "running7.png");

  backGroundImage = loadImage("background.jpg");
}
 
function setup() {
  createCanvas(600,400);

  gameState = 1

player = createSprite(200, 0, 30, 70);
player.addAnimation("running", playerImage);
player.scale = 0.08;

music.play()

endScreen = createSprite(290, 200, 400, 400)
endScreen.addImage(endScreenImg)
endScreen.scale = 0.65

openingScreen = createSprite(290, 200, 400, 400)
openingScreen.addImage(openingScreenImg)
openingScreen.scale = 0.65
openingScreen.depth = openingScreen.depth + 1000

deathWall1 = createSprite(200, 200, 10, 50)
deathWall2 = createSprite(200, 200, 10, 50)
deathWall3 = createSprite(20, 200)
buildingsGroup = createGroup();
buildingsImggroup = createGroup();

backGround = createSprite(200, 200)
backGround.addImage("background", backGroundImage);
backGround.x = backGround.width /2;
backGround.scale = 5

//player.debug = true
player.setCollider("rectangle", 0, 0, 600, 1400)

}

function draw() {
  background(0,0,0);  

  if (frameCount < 130){
  openingScreen.depth = openingScreen.depth + 1000
  openingScreen.scale = 0.65
}

  backGround.velocityX = -5
  if (backGround.x < -200){
    backGround.x = backGround.width/2;
  }
  console.log(gameState)
if(gameState === 1){
endScreen.scale = 0
endScreen.depth = endScreen.depth + 999;
  spawnBuildings();


  if(frameCount > 130){
    openingScreen.scale = 0
    grav()
  }

if(player.x < 0){
  gameState = 2;
}
if(gameState === 2){
endScreen.x = 290
 endScreen.scale = 0.65;
 player.scale = 0
    }

    player.depth = player.depth + 1001;
    buildingsGroup.depth = buildingsGroup.depth + 1;
}
  
   


  drawSprites();
}
 


function spawnBuildings(){
  if(frameCount % 40 === 0){
   var building = createSprite(680, 350, 50, 70)
  var buildingImg = createSprite(680, 350, 50, 70)
   building.velocityX = -4;
    buildingImg.velocityX = -4
 //  building.debug = true
 // buildingImg.debug = true

    score = score +1

   var rand = Math.round(random(1,3))
    switch(rand){
      case 1: building.addImage(building1)
      buildingImg.addImage(building1img)
      buildingImg.y = 340;
       break;
      case 2: building.addImage(building2)
      buildingImg.addImage(building2img)
      buildingImg.y = 340;
       break;
      case 3: building.addImage(building3)
      buildingImg.addImage(building3img);
      break;
      default: break;
    }
    building.scale = 0.317;
    building.lifetime = 250;
    buildingImg.scale = 0.317;
    buildingImg.lifetime = 250;
  buildingsGroup.add(building);
  buildingsImggroup.add(buildingImg);
 
  }
}

function grav(){
  player.collide(buildingsGroup);
  player.velocityY = player.velocityY + 0.6;

if(keyDown("space") && player.isTouching(buildingsImggroup)){
  player.velocityY = -9
}
}

function restart(){
  player.x = 200;
  gameState = 1
  endScreen.scale = 0
}