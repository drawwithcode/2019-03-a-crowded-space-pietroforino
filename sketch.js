var stars = [];

var speed;
var _speed = 150;

function preload() {
  jesus = loadImage("jesus.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}
// template for text
function istruzioni(_x, _y, _cap, _size) {
  noStroke();
  textSize(_size);
  textFont("Righteous");
  textAlign(CENTER);
  text(_cap, _x, _y);
}

function draw() {
  background(30);
  var testo = "press and hold to accelerate";
  if (keyIsPressed === true) {                // if any key is pressed, the speed will grow
    for (var j = 0; j <= 10; j += 1) {
      _speed += 1.5;                          // coefficient of increase
      testo = "relase to return to normal speed";
    }
  } else {
    _speed = 100                              // back to the normal speed
  }
// danger mode
  if (_speed >= 5000) {
    background("red");
    testo = "";
    push()
      istruzioni(windowWidth / 2, windowHeight / 2, "DANGER! LUDICROUS SPEED", windowWidth / 20);
    pop()
    push()
      istruzioni(windowWidth / 2, windowHeight / 2 + windowHeight / 20, "RELASE IMMEDIATLY ALL THE KEY", windowWidth / 80);
    pop()
  }

//space-destroyed mode
  if (_speed >= 8000) {
    background(255);
    noLoop();
    fill("black");
    istruzioni(windowWidth / 2, windowHeight / 2 - windowHeight / 20, "COMPLIMENTS,", windowWidth / 20);
    istruzioni(windowWidth / 2, windowHeight / 2 + windowHeight / 20, "YOU HAVE BROKEN THE SPACE", windowWidth / 20);

//button to restore the game
    button = createButton('PRESS TO RESTORE IT');
    button.style('background-color', 'black');
    button.style('color', 'white')
    button.style('padding', '15px');
    button.style('border-radius', '5px');
    button.style('border-color', 'white');
    button.position(windowWidth / 2-80, windowHeight / 2 + windowHeight / 10);
    button.mousePressed(restore);

//img
    image(jesus, windowWidth/2,windowHeight/2+200,200)

  }



// restore the game by clicking on the button

function restore() {
  loop()
  button.hide()
}

  speed = map(_speed, 0, width, 0, 50);

  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }

  //velocità smodata
  push()
    istruzioni(0, windowHeight / 2.5, testo, 24)
  pop()

}

//starting with star function
function Star() {
  this.x = random(-width, width);     //defyinig x variable
  this.y = random(-height, height);   //defyinig y variable
  this.z = random(width);             //defyinig z variable
  this.pz = this.z;                   //creare variable pz

  this.update = function() {          //function update
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  this.show = function() {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);    //remapping and converting the ending point of the line (x)
    var sy = map(this.y / this.z, 0, 1, 0, height);   //remapping and converting the ending point of the line (y)

    var r = map(this.z, 0, width, 16, 0);             //remapping and converting
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);    //remapping and converting the x-assis star
    var py = map(this.y / this.pz, 0, 1, 0, height);   //remapping and converting the y-assis star

    this.pz = this.z;

    stroke(255);  //defyinig the color of the star's
    line(px, py, sx, sy); //creating the trail of the stars

  }



}
