var stars = [];

var speed;
var _speed = 150

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function istruzioni(_x, _y, _cap, _size) {
  noStroke();
  textSize(_size)
  textFont("Righteous");
  textAlign(CENTER);
  text(_cap, _x, _y)
}

function draw() {
  background(30);
  var testo = "press and hold to accelerate"
  if (keyIsPressed === true) {
    for (var j = 0; j <= 10; j += 1) {
      _speed += 1.5;
      testo = "relase to return to normal speed"
    }
  } else {
    _speed = 100
  }

  if (_speed >= 5000) {
    background("red");
    testo = "";
    push()
      istruzioni(windowWidth / 2, windowHeight / 2, "DANGER! LUDICROUS SPEED", windowWidth / 20)
    pop()
    push()
      istruzioni(windowWidth / 2, windowHeight / 2 + windowHeight / 20, "RELASE IMMEDIATLY ALL THE KEY", windowWidth / 80)
    pop()
  }

  if (_speed >= 8000) {
    background(255)
    noLoop()
    fill("black")
    istruzioni(windowWidth / 2, windowHeight / 2 - windowHeight / 20, "COMPLIMENTS,", windowWidth / 20)
    istruzioni(windowWidth / 2, windowHeight / 2 + windowHeight / 20, "YOU HAVE BROKEN THE SPACE", windowWidth / 20)

    button = createButton('PRESS TO RESTORE IT');
    button.style('background-color', 'black');
    button.style('color', 'white')
    button.style('padding', '15px');
    button.style('border-radius', '5px');
    button.position(windowWidth / 2-80, windowHeight / 2 + windowHeight / 10);
    button.mousePressed(restore);

  }

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

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;

  this.update = function() {
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

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);

  }



}
