// by Sohrab Motabar
// www.sohrab.org
inlets = 1;
outlets = 2;

sketch.default2d();
sketch.glclearcolor(0.9, 0.9, 0.9);
sketch.glclear();

var balls = new Array (61);
var width, height;
var phi = 0;
var dr = 0.01;
var r = 5.4;

onresize();
refresh();

function onresize(){
  width = box.rect[2] - box.rect[0];
  height = box.rect[3] - box.rect[1];


  for (i = 0; i < balls.length; i++){
    balls[i] = new ball((i / (balls.length) * 1.975 - 0.97) * width / height, 0, i);
  }
}


// the ball object
function ball(_x, _y, _idx){
  this.x = _x;
  this.y = _y;
  this.idx = _idx;

  this.drawing = drawing; // drawing() method
}

function drawing(){
  with(sketch){

    moveto(this.x, this.y * 0.9);
    glcolor(0.3, 0.3, 0.3);
    cube(0.05);

  }
}


function draw(){
  with(sketch){
    glcolor(0.9, 0.9, 0.9, 0.025);
    glrect(-1 * width, -1 * height, width, height);
    for (i = 0; i < balls.length; i++){
      with(Math){
        balls[i].y = sin(phi * PI + i/balls.length * r);
        outlet(0, [i, balls[i].y]);
      }
      balls[i].drawing();
    }
  }
  phi += dr;
}



function bang(){
  draw();
  refresh();
}

function set_r(n){
  r = n;
}

function speed(n){
  dr = n / 50;
}
