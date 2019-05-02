// Enemies.js

function Enemy(){

  var eOS = new Group();
  var dBoxes = new Group();

  this.enemies = new Group();
  // this.eVel = 0;
  // this.acc = 0;
  this.g = 3;

  this.createEnemy = function(xSpawn, ySpawn, enemyType){ // Enemy types: Nimble, Brute, Normal,
    if(enemyType == "Nimble"){
      var c = createSprite(
        xSpawn,
        ySpawn,
        16,
        64
      );
      // Variables
      c.onscreen = false;
      c.intelligence = 3;
      c.eVel = 0;
      c.acc = 0;
      c.hasDetectionBox = false;

      c.shapeColor = color(255, 0, 0);

      enemies.add(c);
      collideG.add(c);
      allsprites.add(c);
    } else if(enemyType == "Brute"){
      var c = createSprite(
        xSpawn,
        ySpawn,
        64,
        64
      );
      // Variables
      c.onscreen = false;
      c.intelligence = 3;
      c.eVel = 0;
      c.acc = 0;
      c.hasDetectionBox = false;

      c.shapeColor = color(255, 0, 0);

      enemies.add(c);
      collideG.add(c);
      allsprites.add(c);
    } else if(enemyType == "Normal"){
      var c = createSprite(
        xSpawn,
        ySpawn,
        32,
        64
      );
      // Variables
      c.onscreen = false;
      c.intelligence = 3;
      c.eVel = 0;
      c.acc = 0;
      c.hasDetectionBox = false;

      c.shapeColor = color(255, 0, 0);
      c.hasJump = true;
      enemies.add(c);
      collideG.add(c);
      allsprites.add(c);

    };


    //console.log(enemies);
  };

  this.giveDetectionBox = function(enemyIQ) {
    if(enemyIQ.hasDetectionBox == false){
      var c = createSprite(
        enemyIQ.position.x,
        enemyIQ.position.y,
        300,
        300
      );
      //console.log(enemyIQ);
      c.Pair = enemyIQ;
      c.shapeColor = color(255,255,255,0);
      console.log(enemyIQ);
      enemyIQ.hasDetectionBox = true;

      dBoxes.add(c);

    };
  };

  this.updateDetectionBox = function() {
    for(var i = 0; i < dBoxes.length; i++){
      //console.log(dBoxes[i].Pair);
      dBoxes[i].position.y = dBoxes[i].Pair.position.y;
      dBoxes[i].position.x = dBoxes[i].Pair.position.x;
    };
  };

  this.onScreen = function(){
    // console.log("Hello?");
    //console.log(enemies.length);
    for(var  i = 0; i < enemies.length; i++){
      //console.log("Hello?");
      //console.log(enemies[i]);
      if(enemies[i].overlap(screen) == true){
        enemies[i].onscreen = true;
        this.giveDetectionBox(enemies[i]);
        this.updateDetectionBox();
        this.noticePlayer(enemies[i]);
        this.oSP(enemies[i]);
        //console.log(enemies[i].onscreen);
      } else {
        enemies[i].onscreen = false;
      };
    }
  };

  this.noticePlayer = function(eIQ){

  }

  this.pathFind = function(){
    playerX = Player.returnPositionX();
    playerY = Player.returnPositionY();

    for(var i = 0; i < enemies.length; i++){
      var posX = enemies[i].position.x;
      var posY = enemies[i].position.y;

      if((posX/32 - playerX/32) > 0){
        this.Move(enemies[i], "r", posX-playerX);
      } else if((posX/32 - playerX/32) < 0){
        this.Move(enemies[i], "l", posX-playerX);
      }

      if((posY/32 - playerY/32) > 0){
        // down
      } else if ((posY/32 - playerY/32) > 0){
        this.Jump();
      }

    };

  };

  this.Move = function(entity, direction, distance){
    if(direction == "r"){
      entity.position.x = entity.position.x - 5;
    } else if(direction == "l"){
      entity.position.x = entity.position.x + 5;
    }
  };

  this.Jump = function(entity){
      entity.vel = 0.5;

      entity.position.y += entity.vel/entity.g;
      entity.acc = entity.acc+0.1;
      entity.vel += entity.acc;
  }

  this.oSP = function(enemyIQ){ // on-screen physics to replace physics so only sprites on screen are physiced
    //console.log(enemyIQ);
    if((enemyIQ.collide(collideG) == true) && (enemyIQ.eVel > 0)){
      //console.log("Collision!");
      enemyIQ.eVel = 0;
      enemyIQ.acc = 0;
      hasJump = true;
    } else { // Gravity
      enemyIQ.position.y += enemyIQ.eVel;
      enemyIQ.acc = enemyIQ.acc;
      enemyIQ.eVel += enemyIQ.acc+0.5;
      //console.log(enemyIQ.eVel, enemyIQ.acc);
    };
  }

};



// UNUSED!!!
// this.physics = function() {
//
//     for(var i = 0; i < enemies.length; i++){
//       //console.log(this.enemies[i]);
//       if((enemies[i].collide(collideG) == true) && (enemies[i].eVel > 0)){
//         //console.log("Collision!");
//         enemies[i].eVel = 0;
//         enemies[i].acc = 0;
//         hasJump = true;
//       } else { // Gravity
//         enemies[i].position.y += enemies[i].eVel;
//         enemies[i].acc = enemies[i].acc+0.1;
//         enemies[i].eVel += enemies[i].acc;
//         //console.log(enemies[i].eVel);
//       };
//     };
//
//     //console.log(this.eVel, this.acc);
// };
