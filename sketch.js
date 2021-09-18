var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieimg
var zombieGroup
var bullet, bulletimg, bulletSound 
var heart1, heart2, heart3, heart1img, heart2img, heart3img
var gameState = "play"
var life = 3
var bullets = 100
var win , lose
var score = 0


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieimg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart3img = loadImage("assets/heart_3.png")
  heart2img = loadImage("assets/heart_2.png")
  heart1img = loadImage("assets/heart_1.png")
  bulletimg = loadImage("assets/bullet.png")
  bulletSound = loadSound("assets/explosion.mp3")
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
    
   zombieGroup = new Group()
   bulletGroup = new Group()

   heart1 = createSprite(displayWidth-200,40,20,20)
   heart1.addImage(heart1img)
   heart1.visible = false
   heart1.scale = 0.4
   
   heart2 = createSprite(displayWidth-150,40,20,20)
   heart2.addImage(heart2img)
   heart2.visible = false
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage(heart3img)
   heart3.scale = 0.4

   
   

}

function draw() {
  background(0); 

if (gameState === "play"){

if (bullets === 0){
  gameState = "bullet" 
  lose.play();

}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("W")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("S")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("D")||touches.length>0){
  player.x = player.x+30
}
if(keyDown("A")||touches.length>0){
 player.x = player.x-30
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(player.x,player.y-30,20,10)
  bullet.addImage(bulletimg)
  bullet.velocityX = 100
  bullet.scale = 0.3
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  bullets = bullets-1
  //bulletSound.play();
  player.addImage(shooter_shooting)
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (bullets == 0){
  lose.play();
}

if (zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i < zombieGroup.length;i++ ){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      //bulletSound.play();
      score = score+2
    }
  }
}

if (zombieGroup.isTouching(player)){
  //lose.play();

  for(var i = 0; i < zombieGroup.length;i++ ){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life = life-1
    }
  }
}

if (life === 3){
  heart3.visible =true
  heart2.visible = false
  heart1.visible = false
}

if (life === 2){
  heart3.visible =false
  heart1.visible = false
  heart2.visible = true
}

if (life === 1){
  heart3.visible =false
  heart2.visible = false
  heart1.visible = true
}

if (life === 0){
  gameState ="lost"
}
zombies();

if (score === 202){
  gameState = "win"
  win.play()
}
}

drawSprites();

textSize(20)
fill("white")
text("Bullets = "+bullets,displayWidth-210,displayHeight/2-250)

text("Score = "+score,displayWidth-200,displayHeight/2-220)
text("lives = "+life,displayWidth-200,displayHeight/2-280)

if (gameState === "lost"){
  textSize(100)
  fill("red")
  text("YOU LOSE YOUR BAD",200,400);
  zombieGroup.destroyEach();
  player.destroy();
}
else if(gameState === "win"){
  textSize(100)
  fill("red")
  text("THE END",200,400);
  zombieGroup.destroyEach();
  player.destroy();
}
else if (gameState ==="bullet"){


  textSize(100)
  fill("red")
  text("OUT OF AMO YOU SUCK",200,400);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}
}

function zombies(){
  if (frameCount%40===0){
  zombie = createSprite(random(1000,2000),random(105,500))
  zombie.addImage(zombieimg)
  zombie.velocityX=-5
  zombie.scale = 0.2
  zombie.lifeTime = 400
  zombieGroup.add(zombie)
}
}