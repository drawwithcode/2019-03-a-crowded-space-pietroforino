var stars = [];

var speed;
var _speed = 150

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function draw() {
    background(30);
  var testo = "press and hold to accelerate"
  if (keyIsPressed === true) {
       for (var j = 0; j <= 10; j+= 1) {
         _speed += 1.5;
         testo = "relase to return to normal speed"
       }
     } else {
       _speed = 100
     }

    if (_speed >= 3000) {
       background("red");
       testo = "";
       push()
         noStroke();
         textSize(windowWidth/20);
         textFont("Righteous");
         textAlign(CENTER);
         text("DANGER! LUDICROUS SPEED", windowWidth/2, windowHeight/2)
        pop()

        push()
          noStroke();
          textSize(windowWidth/80);
          textFont("Righteous");
          textAlign(CENTER);
          text("RELASE IMMEDIATLY ALL THE KEY", windowWidth/2, windowHeight/2+windowHeight/20)
         pop()

     }

  speed = map(_speed, 0, width, 0, 50);

  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }

  //velocità smodata
  push()
    noStroke()
    textSize(24);
    textFont("Righteous");
    textAlign(CENTER);
    text(testo, 0, windowHeight/2.5)
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
