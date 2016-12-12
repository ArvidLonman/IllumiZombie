var sketch = function(processingInstance){ with (processingInstance){

size(1000, 700);


//hero er helten, to bilelder med og uden sværd.

/* @pjs preload="hero.png"; */
var heroImage = loadImage("hero.png");


var heroStrikingImage = loadImage("sprite_1.png");

//zombier kommer fra jorden

/* @pjs preload="groundZombie.png"; */
var zombieImage = loadImage("groundZombie.png");

//øjet skal kunne skyde med laser, mod ting der kommer ned fra luften
var eyeImage = loadImage ("eyeImage.png");

var liv = 10; 

//ting fra luften
var airZombieImage; 

imageMode(CENTER);

var groundY = height - 190;

var Zombie = function(x, y, retning) {
    this.x = x;
    this.y = y;
	this.retning = retning;
    this.img = zombieImage;
};

Zombie.prototype.draw = function() {
    fill(255, 0, 0);
    //this.y = constrain(this.y, 0, height-50);
    //this.x = constrain(this.x, 0, 350);
	fill(100,100,100);
	//ellipse(this.x, this.y, 25,25);

    image(this.img, this.x, this.y, 100, 100);
};

Zombie.prototype.checkForEye = function(player) {
	
	player.health--;
};	

var zombieX = 0;

var ninja = 79;

var Ninjja = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = heroImage;
	this.img2 = heroStrikingImage;
	
	this.health = 100;
    
    this.sticks = 0;
};


Ninjja.prototype.checkForStickGrab = function(zombie) {
    if (((zombie.x >= (this.x-25) && zombie.x <= (this.x-5)) || (zombie.x >= (this.x+40) && zombie.x <= (this.x + 60))) &&
        (zombie.y >= this.y && zombie.y <= (this.y + 40))) {
		
		if (zombie.retning === 1) {
			zombie.x = -1000;
		 }else {
			  zombie.x = width + 1000;
		}	 
        this.sticks++;
    }
	
	
};

var Sword = function(x,y) {
    this.x = x;
    this.y = y;
    this.drawn = false;
};

Sword.prototype.draw = function() {
    fill(143, 136, 136);
    ellipse(this.x,291,46,7);
    this.drawn = true;
};

Sword.prototype.vanish = function() {
    this.y = -400;
    this.drawn = false;
};

Ninjja.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    this.x = constrain(this.x, 0, 1000);
    
	fill(100,100,100);
	//ellipse(this.x, this.y, 50,50);
	image(this.img, this.x, this.y, 120, 120);
};

Ninjja.prototype.strike = function() {
	 fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    this.x = constrain(this.x, 0, 1000);
    
	fill(100,100,100);
	//ellipse(this.x, this.y, 50,50);
	image(this.img2, this.x, this.y, 120, 120);
};

Ninjja.prototype.left = function() {
    this.x -= 3;
};

Ninjja.prototype.right = function() {
    this.x += 3;
};

var ninjaX = 250;
var ninja = new Ninjja(ninjaX, groundY);
var sword = new Sword(ninjaX,219);

var Zombies = [];

for (var i = 0;i<50;i++) {
    Zombies.push(new Zombie(random(-4000,0), groundY,1));
    Zombies.push(new Zombie(random(1000,5000), groundY,-1));
}


var keyIsPressed = -1;

var keyPressed = function(){

keyIsPressed = keyCode;

};
var keyReleased = function(){

keyIsPressed = -1;

};



var mouseIsPressed = false;

var mousePressed = function(){

mouseIsPressed = true;

};
var mouseReleased = function(){

mouseIsPressed = false;

};


var drawLazer = function(){
	
	
	if(mouseIsPressed){
	fill(255,0,0);
	stroke(255,0,0);
	strokeWeight(2);
	line(width/2,height-175,mouseX,mouseY);
	}
	
	
};



draw = function() {
	
	if (liv <=0 ){
		alert("Illuminati tabte verdensherredømmet til zombierne! Prøv igen.");
		liv = 10;
		ninja.sticks = 0;
		Zombies = [];

		for (var i = 0;i<50;i++) {
			Zombies.push(new Zombie(random(-4000,0), groundY,1));
			Zombies.push(new Zombie(random(1000,5000), groundY,-1));
		}
	}
	

    noStroke();
    background(9, 222, 194);
    fill(14, 232, 14);
    rect(-2,height - 156,1100,300);
    fill(250, 251, 255);
    
    fill(0, 0, 0);

	image (eyeImage,width/2,groundY);
    
    if (keyIsPressed != -1 && keyCode === RIGHT) {
            ninja.right();
    }     
    else if (keyIsPressed != -1 && keyCode === LEFT) {
            ninja.left();
     }
     
    /*
    if (keyIsPressed && keyCode === CONTROL) {
        if (sword.drawn === false) {
            sword.draw();
        } else {
            sword.vanish();
        }
    }
    */
    if (keyIsPressed != -1 && keyCode === CONTROL) {
		 ninja.strike();
	 } else {ninja.draw();}
    
	textSize(18);
    text("liv: " + liv, 900, 30);
	
	textSize(18);
    text("Score: " + ninja.sticks, 20, 30);
	
	for (var i = 0;i<Zombies.length;  i++){
		
      Zombies[i].draw();
	  
	  if (keyIsPressed != -1 && keyCode === CONTROL) {
	  ninja.checkForStickGrab(Zombies[i]);
	  }
	  
	  var midten = 500;
	
	 if (Zombies[i].x > midten-25 && Zombies[i].x < midten+25) {

	 if (Zombies [i].retning === 1) {
		Zombies[i].x = -1000;
	  }else {
		  Zombies[i].x = width + 1000;
	  }	 
	  
       	liv = liv -1;
      }
	  
	  if (Zombies [i].retning === 1) {
		Zombies[i].x += 0.5;
	  }else {
		  Zombies[i].x -= 0.5;
	  }
	  Zombies[i].checkForEye(ninja);
     
  }
  
  drawLazer();
  
	
};


}}; // End sketch
