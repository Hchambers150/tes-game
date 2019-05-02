var keys = [];

function Player() {

  var player;
  var hasJump = true;
  var sSpeed;
  this.g = 3;
  this.vel = 0;
  this.acc = 0.1;

  this.move = function() {
    // Move
    var speed = 5;

    if(keys[1] == true){
      this.player.position.y = this.player.position.y - speed-5;
    }
    if(keys[2] == true){
      this.player.position.y = this.player.position.y + speed;
    }
    if(keys[3] == true){
      this.player.position.x = this.player.position.x - speed;
    }
    if(keys[4] == true){
      this.player.position.x = this.player.position.x + speed;
    }

    // Sprint
    sSpeed = 3;

    if (keys[3] == true && keys[5] == true){
      this.player.position.x = this.player.position.x - sSpeed;
    } else if (keys[4] == true && keys[5] == true) {
      this.player.position.x = this.player.position.x + sSpeed;
    }

    //console.log("Move!", keys);

    // axis = axis + speed;
    // console.log(axis, speed);

  };

  this.jump = function() {
    // Jump
    //console.log(hasJump);
    if(hasJump == true){
    // Set Height Jump
      this.vel = -17;
      this.g = 1;
      hasJump = false;

    // Held Jump


      //console.log("Jump!");
    };
  };

  this.display = function(xPos, yPos) {
    // 'Skins' / Costumes / Gear?

    var spawnX = xPos;
    var spawnY = yPos;

    this.player = createSprite(
        spawnX, // Spawn X
        spawnY,                     // Spawn Y
        32,                   // Width
        64                  // Height
      );

      this.player.shapeColor = color(255);
      Player.player.collide(collideG);
      this.player.maxVel = 1;
      allsprites.add(this.player);
  };

  // Health & Health bar

  this.health = function(){

    var defaultHealth = 100;
    var healthBoxes = new Group();
    //Color =

    this.update = function(health, damageTaken){
      for(var i = 0; i < damageTaken/5; i--){

      }
    };

    this.display = function(){
      for(var i = 1; i < defaultHealth+1 / 10; i++){
        if (i < 11){
          var c = createSprite((i*55), 50, 25, 25);
          fill(255, 255, 255);
          c.draw = function() {
            triangle(-25, 0, 0, 25, 25, 0);
          };
          c.rotation = 90;
          healthBoxes.add(c);

          var d = createSprite((i*55), 50, 25, 25);
          d.draw = function() {
            triangle(-25, 0, 0, 25, 25, 0);
          };
          d.rotation = -90;
          healthBoxes.add(d);
        }
    };

    }
  }


  // Physics

  this.physics = function() {

      if((this.player.collide(collideG) == true) && (this.vel > 0)){
        //console.log("Collision!");
        this.vel = 0;
        this.acc = 0;
        hasJump = true;
      } else { // Gravity
        this.player.position.y += this.vel/this.g;
        this.acc = this.acc+0.1;
        this.vel += this.acc;

        // if(this.vel > 0){
        //   hasJump = false;
        // };

        //console.log("hi");
      };

      if(this.player.position.x < 0){
        this.player.position.x = 0;
        // this.vel = 0;
        //this.acc = 0;
        // hasJump = true;
      } else if(this.player.position.x > width){
        this.player.position.x = width;
        // this.vel = 0;
        //this.acc = 0;
        // hasJump = true;
      }
      if(this.player.position.y < 0+this.player.height/2){
        this.player.position.y = 0+this.player.height/2;
        //this.vel = 0;
        //this.acc = 0;
        //hasJump = true;
      } else if(this.player.position.y-100 > height-this.player.height/2){ // doesnt do anything but i'm keeping it in for []
        this.player.position.y = height-this.player.height/2+2;
        this.vel = 0;
        this.acc = 0;
        //hasJump = true;
      }

      // Screen Moving -- Move to it's own class?

      if(this.player.position.x > windowWidth/4*3){
        for(var i = 0; i < allsprites.length; i++){
          allsprites[i].position.x = allsprites[i].position.x - 5;
        }
        for(var i = 0; i < backgroundSprites.length; i++){
          backgroundSprites[i].position.x = backgroundSprites[i].position.x - 1;
        }
      } else if(this.player.position.x < windowWidth/4 && allsprites[0].position.x <= 14){ // && (allsprites[0].position.x-16 - player.position.x < -windowWidth/4)
        for(var i = 0; i < allsprites.length; i++){
          allsprites[i].position.x = allsprites[i].position.x + 5;
        }
        for(var i = 0; i < backgroundSprites.length; i++){
          backgroundSprites[i].position.x = backgroundSprites[i].position.x + 1;
        }
      }

      if(this.player.position.y < windowHeight/4){
        for(var i = 0; i < allsprites.length; i++){
          allsprites[i].position.y = allsprites[i].position.y + 5;
        }
      } else if(this.player.position.y > windowHeight/4*3 && allsprites[0].position.y >= windowHeight+10){
        for(var i = 0; i < allsprites.length; i++){
          allsprites[i].position.y = allsprites[i].position.y - 25;
        }
      }



      //console.log(this.vel, this.acc);
  };

  this.returnPositionX = function() {
    return this.player.position.x;
  };

  this.returnPositionY = function() {
    return this.player.position.y;
  }

};

function keyPressed() {

  var speed = 5;
  //var keys = [];

  if((keyCode == UP_ARROW)||(keyCode == 87)){
    keys[1] = true;
    //allSprites[allSprites.length-1].remove();
  } else if((keyCode == DOWN_ARROW)||(keyCode == 83)){
    keys[2] = true;
  } else if((keyCode == LEFT_ARROW)||(keyCode == 65)){
    keys[3] = true;
    //Player.move(Player.player.position.x, -speed);
    //Player.player.position.x = Player.player.position.x +10;
  } else if((keyCode == RIGHT_ARROW)||(keyCode == 68)){
    keys[4] = true;
  } else if(keyCode == 16){
    keys[5] = true;
  } else if(keyCode == 32){
    keys[1] = true;
    //Player.jump();
    //jump();
  }else if(keyCode == 17 || keyCode == "l"){
    keys[6] = true;
  } else if(keyCode == 188){ // Comma
    attack('dagger', player)
  } else if(keyCode == 'b'){
    crouch = true;
  } else if(keyCode == 27){
    Menu.initMenu();
  }

}

function keyReleased() {

  //keys[6] = false;

  if((keyCode == UP_ARROW)||(keyCode == 87)){
    keys[1] = false;
  } else if((keyCode == DOWN_ARROW)||(keyCode == 83)){
    keys[2] = false;
  } else if((keyCode == LEFT_ARROW)||(keyCode == 65)){
    keys[3] = false;
  } else if((keyCode == RIGHT_ARROW)||(keyCode == 68)){
    keys[4] = false;
  } else if(keyCode == 16){
    keys[5] = false;
  } else if(keyCode == 32){
    keys[1] = false;
  } else if(keyCode == 17 || keyCode == "l"){
    keys[6] = false;
  } else if(keyCode == 'b'){
    crouch = false;
  }
}
