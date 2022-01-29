var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car1, car2, car3, car4;
var car1Img, car2Img, car3Img, car4Img;
var backgroundImg;
var carro_en_movimiento, carro_encendiendose, claxon;
var i=0;
var j=0;

var  Cars;

function preload(){

  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");
  carro_en_movimiento = loadSound("sound/carro_en_movimiento.mp3");
  carro_encendiendose = loadSound("sound/carro_encendiendose.mp3");
  claxon = loadSound("sound/claxon.mp3");
  
  backgroundImg = loadImage("images/Pista.png");

}
function setup(){
  canvas = createCanvas(displayWidth - 30, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  car1 = createSprite(100,300,20,20)
  car2 = createSprite(120,300,20,20)
  car3 = createSprite(140,300,20,20)
  car4 = createSprite(160,300,20,20)
 
  car1.addImage(car1Img);
  car2.addImage(car2Img);
  car3.addImage(car3Img);
  car4.addImage(car4Img);

  

  Cars =[car1,car2,car3,car4];
  
  
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    image(backgroundImg,180,-displayHeight*4+500,displayWidth,displayHeight*20);
    game.play();
    if(i===0){
      carro_encendiendose.play();
      i=1
    };

    sonidoClaxon();
   drawSprites();
  }
 




}
function sonidoClaxon(){
if(keyDown("c")){
claxon.play();
}
}



function gameOver(){
  carro_en_movimiento.stop();
  swal({

    title:"YOU WIN",
    text:"Thank you for playing!",
    confirmButtonText:"Reset"
  },
    function(isConfirm){
      location.reload();
      player.updateCount(0);
      game.update(0);
    })
}