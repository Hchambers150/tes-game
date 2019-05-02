// Menu.js

function Menu(){

  this.initMenu = function(){
    menu = true;

    var paused = createSprite(
      windowWidth/2,
      windowHeight/6,
      1000,
      200
    );

    paused.shapeColor = color(255);
    menuSprites.add(paused);

    var resume = createSprite(
      windowWidth/3+17,
      windowHeight/3+50,
      475,
      150
    )

    resume.shapeColor = color(255);
    menuSprites.add(resume);

    drawSprites();
    fill(10);
    textSize(200);
    text("Paused", windowWidth/2-350, windowHeight/6+70);
    textSize(115);
    text("Resume", windowWidth/5+25, windowHeight/3+90);

  }

  this.displayMenu = function(){


  }

  this.removeMenu = function(){
    //console.log("Sup")
    for(var i = 0; i < menuSprites.length; i++){
      console.log(menuSprites[0]);
      menuSprites.remove(menuSprites[0]);
      allsprites.remove(allsprites[i]);
      console.log(menuSprites);
    }
    menu = false;
  }

};
