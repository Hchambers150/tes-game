//var screen;

function setup(){

  menu = false;

  // Tile Groups
  var chests = new Group();
  var level = 1;
  healthPacks = new Group();
  backgroundSprites = new Group();

  allsprites = new Group;

  physicsObjects = new Group(); // All objects acted on by physics.
  healthPacks = new Group();
  enemies = new Group();
  menuSprites = new Group();

  collideG = new Group();

  //Player.display();
  createCanvas(windowWidth, windowHeight);
  screen = createSprite(
    windowWidth/2, windowHeight/2,
    windowWidth, windowHeight
  );
  screen.shapeColor = color(0,0,0,0);

  // Enemies
  Enemy = new Enemy();

  // Menu
  menuSprites = new Group();
  Menu = new Menu();
  //Menu.initMenu();

  Player = new Player();
  //Player.display();
  // Enemy.createEnemy(windowWidth/2-100, windowHeight/2, "Normal");
  // Enemy.createEnemy(windowWidth/2, windowHeight/2, "Nimble");
  // Enemy.createEnemy(windowWidth/2+100, windowHeight/2, "Brute");

  healthBar = new Player.health();
  healthBar.display();

  // Map
  tile = new tile();
  Map = new Map(level);
  Map.initMap();
  Player.player.collide(collideG);

  //Particle = new Particle()

  // collisionTest = createSprite(windowWidth/2, windowHeight-100, 100, 100);
  // collisionTest.collide(Player.player);

  // drawSprites();
}

function draw(){

  if(menu == false){
    allPlayer();
    background(147, 188, 255);
    drawSprites();
    //Enemy.physics();
    Enemy.onScreen();
    Enemy.pathFind();
  };

  // if(Player.player.overlap(screen) == true){
  //   //  console.log("Hi");
  // }

}

function allPlayer(){
  Player.move();
  Player.physics();
}

function mouseClicked(){
  Player.player.position.x = mouseX;
  Player.player.position.y = mouseY;

  var c = createSprite(
    mouseX,
    mouseY,
    10, 10
  );

  c.shapeColor = color(1);
  drawSprites();

  for(var i = 0; i < menuSprites.length; i++){
    if(c.overlap(menuSprites[i]) == true){
      //console.log(menuSprites[i]);
      if(i == 1){
        //menu = false;
        Menu.removeMenu();
        //console.log(menu);
      }
    }
  }

  //console.log("Click!");

}

// var Particle = function(position) {
//   this.acceleration = createVector(0, 0.05);
//   this.velocity = createVector(random(-1, 1), random(-1, 0));
//   this.position = position.copy();
//   this.lifespan = 255;
// };
