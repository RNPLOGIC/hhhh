const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonballs = [];
var boat

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {

  canvas = createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES); 
  angle = 15;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);
  cannon = new Cannon(180, 120, 130, 100, angle);
  boat = new Boat(width,height-60,170,170,-60);
 
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop(); 
  
  
  for(var cannonIndex = 0;cannonIndex<cannonballs.length;cannonIndex++){
    var ball = cannonballs[cannonIndex];
    if(ball)
      ball.show();
  } 
  cannon.show()
  

}
function keyReleased(){
  if (keyCode===DOWN_ARROW){
     cannonballs[cannonballs.length - 1].shoot()
  }
}
function keyPressed(){
if(keyCode=DOWN_ARROW){
  var cannonball = new CannonBall(cannon.x, cannon.y)
  cannonball.trajectory = [];
  Matter.Body.setAngle(cannonball.body, cannon.angle);
  cannonballs.push(cannonball)
}
}
function showboats(){
Matter.Body.setVelocity(boat.body,{x:-0.9,y:0})
  boat.show();
  //boat.push(boats);
}