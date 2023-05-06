const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var ground
var rope
var fruit_con
var bgImg
var coelhoImg
var coelho
function preload(){
  bgImg= loadImage("assets/bg.png")
  coelhoImg = loadImage("assets/per1.png")
  fruitImg = loadImage("assets/candy.png")

  bk_song = loadSound('assets/sound1.mp3')
  sad_sound = loadSound('assets/sad.wav')
  cut_sound = loadSound('assets/rope_cut.mp3')
  eanting_sound = loadSound('assets/eating_sound.mp3') 
  
  blink = loadAnimation('assets/per1.png')
  eat = loadAnimation('assets/bocaaber.png', 'assets/per1.png')
  sad = loadAnimation('assets/per2.png')
  
  eat.looping = false
}


function setup() 
{
  createCanvas(500,700);
  imageMode(CENTER)
  eat.frameDelay = 20
  coelho = createSprite(250,610,40,40)
  coelho.addImage(coelhoImg)
  coelho.scale =0.3
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
 ground = new Ground(200,690,600,20)
 rope = new Rope(8, {x: 40,y:30})
 rope2 = new Rope(7, {x: 260,y: 5})
 rope3= new Rope(10,{x: 495,y: 210})

 var fruitOptions ={
  density:0.001
 
 }


 coelho.addAnimation('blinkking', blink)
 coelho.addAnimation('eating', eat)
 coelho.addAnimation('crying', sad)
 coelho.changeAnimation('blinking')
  fruit = Bodies.circle(300,300,15,fruitOptions)
  Composite.add(rope.body, fruit)

  fruit_con= new Link(rope,fruit)
  fruit_con2= new Link(rope2,fruit)
  fruit_con3= new Link(rope3,fruit)


button = createImg("assets/tes.png")
button.position(20, 30)
button.size(50, 50)
button.mouseClicked(drop)




button2 = createImg("assets/tes.png")
button2.position(230, 5)
button2.size(60, 60)
button2.mouseClicked(drop2)


button3 = createImg("assets/tes.png")
button3.position(430, 200)
button3.size(60, 60)
button3.mouseClicked(drop3)

mute_btn = createImg('assets/mute.png')
mute_btn.position(450, 20)
mute_btn.size(50,50)
mute_btn.mouseClicked(mute)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)



  
}

function draw() 
{
  background(51);
image(bgImg,  width/2, height/2 ,500, 700)
  
  Engine.update(engine);
ground.show()
rope.show()
rope2.show()
rope3.show()


if (fruit != null) {
image(fruitImg, fruit.position.x, fruit.position.y,60,60)  
}
drawSprites()

if (collide(fruit,coelho)==true) {
  coelho.changeAnimation("eating")
  
}

 if (fruit != null && fruit.position.y >=650) {
coelho.changeAnimation("crying")

fruit = null
 }

}


function drop() {
  
  cut_sound.play()
  rope.break()
  fruit_con.corta()
  fruit_con = null
}



function drop2(){
  cut_sound.play()
  rope2.break()
  fruit_con2.corta()
  fruit_con2 = null
}

function drop3(){
  cut_sound.play()
  rope3.break()
  fruit_con3.corta()
  fruit_con3 = null
}

function mute(){

 if (bk_song.isPlaying()){
  bk_song.stop()
 }else{bk_song.play()}


}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    )

    if (d <= 80) {
      World.remove(engine.world, fruit)
      fruit = null
      return true
    }else{
      return false
    }
  }
}
