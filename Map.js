// Map

//console.log("hi!");

function Map(level) {

  var spriteWidth = 1;
  var skip = 0;
  var tileHeight = 32;
  var tileWidth = 32;

  this.initMap = function() {

    if (level == 1) { // Level

      tMap = [
        "                                                          k           k ",
        "                                                          k           k",
        "                                                          ooooooooooooo  ",
        "                                                                                                              ",
        "                                                                                                              ",
        "                                                                                                              ",
        "                                                                                                              ",
        "                                                                                                              ",
        "                                                                                                              ",
        "                                                                                                              ",
        " kkkkkkkk                                                      o",
        "k        k                      ooo   ooo        ooo      o        ",
        "k        k                                                                         ooooooooooooooooooooooooooooooooooo                                               ",
        "k        k                  ooo                                                  ookkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdd                                                  ",
        "k   s    k                                                                       ookkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdd                                                  ",
        "oooooooooooooooooj                                                             ookkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdd                                                    ",
        "ooo o ooo                                                                      ookkkkkkkoooooooooooooooooooooooooooooo                                     ",
        " o     o                                                                       ookkkkkkkkkkkokkkkkokkkkkkkkkkkkkkkkkoo                                     ",
        " o o o o                                                                     ookkkkkkkkkkkkkokkkkkokkkkkkkkkkkkkkkkkoo                                     ",
        " ooooooo                oo                                                   ookkkkkkkkkkokkkkkokkkkkokkkkkkkkkkkkkkoo                                   ",
        " ooo ooo                 k                                                   oo*kkkkkkkkkokkkkkokkkkkokkkkkkkkkkkkkkoo                                     ",
        "  o o o                  k        ooooo                                      oooooooooooooooooooooooooooookkkkkkkkkkoo",
        " ooo ooo                 k      ooookoooo                                    ookkkkkkkkkkkkkkkkkkkkkkkkkookkkkkkkkkkoo",
        "ooooooooo                k    oooookkkooooo                                  ookkkkkkkkkkkkkkkkkkkkkkkkkookkkkkkkkkkoo",
        " o ooo o                 k      kkkk kkkk                                    ookkkooooooooooooooooookkkkookkkkkkkookoo",
        " o o o o                 k      k       k                                    ookkkkkkkkkkkkkkkkkkkkkkkkkookkkkkkkkkkoo",
        " ooo ooo                 k      k       k                                    ookkkkkkkkkkkkkkkkkkkkkkkkkookkkkkkkkkkoo",
        " o o o o                 k      k       k                                    ookkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoo",
        " o ooo o                 k      k       k                                    kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoookkoo",
        "ooooooooo                k      k       k                                    kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoo",
        " o ooo o                 k      kkkkekkkk                                    kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoo",
        " ooo ooo                 k    ooooooooooooo                                ooooooooooooooooooooooooooooooooooooooooooo",
        "wooowooowwwwwwwwwwwwwwwwwkwwwwwwkkwwwwwkkwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwoowwwwwwwwwwwoowwwwwwwwwwwwoowwwwwwwwwwoo"
      ];

      this.makeBackground();
      //this.tile();
      this.placeTiles(tMap);
      this.placeBorders(150, 25);

      //console.log(allsprites.length);

    }

  };

  this.placeBorders = function(levelWidth, levelHeight){
    levelWidth = levelWidth*tileWidth;
    levelHeight = levelHeight*tileHeight;
    tile.bedrock(0, windowHeight+10, tileWidth*levelWidth, tileHeight);
    tile.bedrock(0, 0, 1, levelHeight);
    tile.bedrock(levelWidth, 0, 32, levelHeight)

  }

  this.placeTiles = function(tMap){

    //console.log(windowWidth/64);

    var iPlacement = 0;
    var backwards = tMap.length-1;

    for(var i = backwards; i >= 0; i--){
      iPlacement++;
      this.checkRow(tMap, i, iPlacement);
    }

  };

  this.checkRow = function(tMap, i, iPlacement){
    var tileCount = 1;
    var maxJ;

    for(var j = 0; j < tMap[i].length; j++){
      var mainJ = j;
      //console.log("main j:", j);
      //tMap[i][j] - the scope that is being used here.
      if(tMap[i][j] != " "){

        var tMin = 1;
        var skip = 0;

        for(var t = 0; t < tMin; t++){

          if(tMap[i][j] == tMap[i][j+1] && tMap[i][j] != " " && tMap[i][j] != undefined){
            // variables
            skip++;
            tileCount++;
            tMin++;
            j++;

            //console.log("skip:",skip, "tilecount:",tileCount, "j:",j);
          } else {
            // setting values that are needed to stay around.
            maxJ = mainJ;
            j = mainJ + skip;
            var tTG = tileCount;
            // increasing variables every time a similar block is detected.
            tMin = 1;
            skip = 0;
            tileCount = 1;
            //console.log(giveJ, iPlacement-1, tileWidth*tileCount, tileHeight, tMap[i][j])
            this.placeTile(mainJ/3, iPlacement-1, tileWidth*tTG, tileHeight, tMap[i][mainJ]);
          }

        } // end
      }; // end if
    } // end for
  };

  this.placeTile = function(x, y, w, h, type){
    //console.log("Tile Placed!");

    var xPOS = (x*tileWidth*3)+w/2;

    // tile.randomColour(xPOS, height-y*h-h/2, w, h/4);

    if(type == "x"){ //x = White
      tile.whiteTile(xPOS, height-y*h-h/2, w, h);
    } else if (type == "o") { //o = red/brown
      tile.wood(xPOS, height-y*h-h/2, w, h);
    } else if (type == "w") { // w = water / blue
      tile.water(xPOS, height-y*h, w, h);
    } else if (type == "j") { // j = jump / red
      tile.jumpPad(xPOS, height-y*h-h/2, w, h, height-y*h-h*0.87, h/4);
    } else if (type == "h") { // Health Pack
      var c = createSprite(xPOS, height-y*h-h/2, w, h);
      c.shapeColor = color(255, 100, 100);
      healthPacks.add(c);
      allsprites.add(c);
    } else if (type == "k") { // Brown Background
      tile.backgroundBrown(xPOS, height-y*h-h/2, w, h)
    } else if (type == "e") { //  Enemy
      tile.enemySpawn(xPOS, height-y*h-h/2);
    } else if (type == "s") { // Spawn Point
      tile.playerSpawn(xPOS, height-y*h-h/2);
    }
  };

  this.makeBackground = function(){
    for(i = 0; i < random(5, 20); i++){

      posx = random(0, windowWidth),
      posy = windowHeight,
      cWidth = random(100, 600),
      cHeight = random(100, 600)

      c = createSprite(
        posx,
        posy,
        cWidth,
        cHeight
      );

      d = createSprite(
        posx,
        posy - cHeight/2,
        cWidth,
        20
      );


      c.shapeColor = color(89, 54, 0);
      d.shapeColor = color(10, 70, 10);

      backgroundSprites.add(c);
      backgroundSprites.add(d);
    }
  }

};

function tile(){

  this.wood = function(xPos, yPos, w, h){
    //console.log("work on tile class!");
    var c = createSprite(xPos, yPos, w, h);
    //c.shapeColor = color(random(255), random(255), 1);
    c.shapeColor = color(119, 62, 62);
    //c.shapeColor = color(random(255), random(255), random(255));
    collideG.add(c);
    allsprites.add(c);
  };

  this.whiteTile = function(xPos, yPos, w, h){
    var c = createSprite(xPos, yPos, w, h);
    c.shapeColor = color(255);
    collideG.add(c);
    allsprites.add(c);
  };

  this.water = function(xPos, yPos, w, h){
    var c = createSprite(xPos, yPos, w, h/2);
    c.shapeColor = color(70, 150, 255, 200);
    allsprites.add(c);
  };

  this.backgroundBrown = function(xPos, yPos, w, h){
    var c = createSprite(xPos, yPos, w, h);
    c.shapeColor = color(80, 44, 0);
    //healthPacks.add(c);
    allsprites.add(c);
  };

  this.jumpPad = function(xPos, yPos1, w, h1, yPos2, h2){
    var c = createSprite(xPos, yPos1, w, h1);
    c.shapeColor = color(210, 50, 50);
    var d = createSprite(xPos, yPos2, w, h2);
    d.shapeColor = color(255);
    collideG.add(c);
    allsprites.add(c);
    allsprites.add(d);
  };

  this.chest = function(xPos, yPos, w, h, lootContain, lootID){
    var c = createSprite(xPos, yPos, w, h);
    c.shapeColor = color(80, 44, 0);
    c.lootID = lootID;
    c.lootContain = lootContain;

    //healthPacks.add(c);
    allsprites.add(c);
    chests.add(lootID);
  };

  this.bedrock = function(xPos, yPos, w, h){
    var bedrockS = createSprite(xPos+w/2, yPos+h+40, w, h*4);
    bedrockS.shapeColor = color(51);
    collideG.add(bedrockS);
    allsprites.add(bedrockS);
    //console.log("Bedrock Confirmed!");
  };

  this.enemySpawn = function(xPos, yPos){
    Enemy.createEnemy(xPos, yPos, "Normal");
  };

  this.playerSpawn = function(xPos, yPos){
    Player.display(xPos, yPos);
  };

  this.randomColour = function(xPos, yPos, w, h){
    var randomC = createSprite(xPos+1/2, yPos+h+40, w, h*4);
    randomC.shapeCOlor = color(random(1,255), random(1,255), random(1,255));
    collideG.add(randomC);
    allsprites.add(randomC);
  }

}
