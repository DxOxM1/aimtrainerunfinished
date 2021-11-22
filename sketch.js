var gameState = -1
var present = 1
var score = 0
var ballSpawner = 1
function preload(){

circleImg = loadImage("circleobject.png")
rectangleImg = loadImage("rectangleobject.png")




}

function setup() {
  createCanvas(windowWidth, windowHeight);
  edges = createEdgeSprites()
  cGroup = createGroup()
  if(gameState===-1){
  BlackBarBottom = createSprite(200,700,3000,700)
  BlackBarBottom.shapeColor = 'black'
  
  BlackBarTop = createSprite(200,0,3000,700)
  BlackBarTop.shapeColor = 'black'

  hiddenBlockOne = createSprite(500,400,50,50)
  hiddenBlockOne.shapeColor = 'red'
  hiddenBlockOne.visible = false

  hiddenBlockTwo = createSprite(1500,400,50,50)
  hiddenBlockTwo.shapeColor = 'red'
  hiddenBlockTwo.visible = false

  hiddenBlockTwo.velocityX = -9
    
  
  
  
  

  }
  circle = createButton("Flick")
  circle.hide()
  smalltracking = createButton("Small Head Tracking")
  smalltracking.hide()
  rectangle = createButton("Tracking")
  rectangle.hide()
}


function draw() {
  background("grey");

  if(gameState === 0){
    circle.show()
    circle.position(100, 100)
    circle.style("width","100px")
    circle.style("height","50px")
    circle.style("font-size","40px")
    circle.mouseClicked(function(){
      gameState = 1
      circle.hide()  
      rectangle.hide()
      smalltracking.hide()
    })

    smalltracking.show()
    smalltracking.position(100,300)
    smalltracking.style("width","250px")
    smalltracking.style("height","50px")
    smalltracking.style("font-size","25px")
    smalltracking.mouseClicked(function(){
      gameState = 3
      circle.hide()
      rectangle.hide()
      smalltracking.hide()
    })

    rectangle.show()
    rectangle.position(100, 200)
    rectangle.style("width","166px")
    rectangle.style("height","50px")
    rectangle.style("font-size","40px")
    rectangle.mouseClicked(function(){
      gameState = 2
      rectangle.hide()
      circle.hide()
      smalltracking.hide()
    })
  }
  
  if(hiddenBlockTwo.isTouching(hiddenBlockOne)){
    hiddenBlockTwo.destroy()
    hiddenBlockOne.destroy()
    BlackBarBottom.velocityY = 20
    BlackBarTop.velocityY = -20
    gameState = 0
  }
 if(gameState === 1||gameState === 2||gameState === 3){
  textSize(30)
  fill("red")
  text("Score = "+score,width/2, 50)
 }


  if(gameState === 3){
    if(ballSpawner === 1){
      TrackingCircle()
      ballSpawner = 2
    }
    
    if(frameCount%30 === 0){
      var Velocity = [-20,20]
      BallGoingLeftAndRight.velocityX = random(Velocity)
      
    }
BallGoingLeftAndRight.bounceOff(edges)
if(mousePressedOver(BallGoingLeftAndRight)){
  score = score+1
}
  }


  if(gameState === 2){

  if(present === 1){
    RedRECTANGLE()
    present = 2
  }
  
  RectangleObject.bounceOff(edges)
  if(frameCount %40===0){
    RectangleObject.velocityX = random(-20,20)
    RectangleObject.velocityY = random(-10,10)
  }
  if(mousePressedOver(RectangleObject)){
    score=score+1
    
  }
  
  RectangleObject.debug = false
  RectangleObject.setCollider("rectangle",0,-10,330,80)
}
  if(gameState === 1){
    RedCircle()
    cGroup.forEach(function(c){
      if(mousePressedOver(c)){
        score = score+1
        c.destroy()
      }
    })
    
  }
  drawSprites();
  if(gameState === -1){
    fill('white')
  textSize(100)
  text("Welcome to Aim Trainer",200,400)
  }
}

function RedRECTANGLE(){

RectangleObject = createSprite(random(30,770),random(30,370))
RectangleObject.addImage(rectangleImg)
RectangleObject.velocityX = random(-20,20)
RectangleObject.velocityY = random(-10,10)
RectangleObject.rotation = 90
RectangleObject.scale = 0.3

}

function RedCircle(){
  if(frameCount %20===0){
    circleObject = createSprite(random(30,770),random(30,370))
    circleObject.addImage(circleImg)
    circleObject.lifetime = 20
    circleObject.scale = 0.1
    cGroup.add(circleObject)
  }
}

function TrackingCircle(){
  BallGoingLeftAndRight = createSprite(random(30,770),height/2)
  BallGoingLeftAndRight.addImage(circleImg)
  BallGoingLeftAndRight.scale = 0.05
}