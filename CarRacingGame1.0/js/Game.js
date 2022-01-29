class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      var display_position = 130;
      var index = 0;
      
     // console.log(allPlayers[plr].distance);

      var x = 380;
      var y ;
      for(var plr in allPlayers){
      index = index+1;
      x = x+200;
      y = displayHeight-allPlayers[plr].distance+11800;
      Cars[index-1].x = x;
      Cars[index-1].y = y;

        if (plr === "player" + player.index){
          Cars[index-1].shapeColor = "red";
          camera.position.x = 850;
          camera.position.y = y;
          fill("purple");
          ellipse(x,y,60,60);

          if(allPlayers[plr].distance>14300){
            gameOver();

          }
        }
        else {
          fill("black");
        }
        display_position+=20;
        textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    if(player.distance>14300){
      player.rank++
      Player.updateCarsAtEnd(player.rank);

    }
    if(keyIsDown(UP_ARROW ) && player.index !== null && player.distance<14301){
      player.distance +=50
      player.update();
      if(!carro_en_movimiento.isPlaying()){
        carro_en_movimiento.play();
        carro_en_movimiento.setVolume(0.05);

      }
    }
    
  }
}
