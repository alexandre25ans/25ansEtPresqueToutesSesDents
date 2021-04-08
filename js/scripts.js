/*!
* Start Bootstrap - Landing Page v5.1.0 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function someFunction(link){
    window.open(link);
}

window.onload = function () {

    // Definitions
    var canvas = document.getElementById("paint-canvas");
    if(canvas == null)
        return;
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();

    context.fillStyle = "pink";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Specifications
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'white'; // initial brush color
    context.lineWidth = 10; // initial brush width
    var isDrawing = false;

    // Mouse Down Event
    canvas.addEventListener('mousedown', function(event) {
      setMouseCoordinates(event);
      isDrawing = true;

      // Start Drawing
      context.beginPath();
      context.moveTo(mouseX, mouseY);
    });

    // Mouse Move Event
    canvas.addEventListener('mousemove', function(event) {
      setMouseCoordinates(event);

      if(isDrawing){
        context.lineTo(mouseX, mouseY);
        context.stroke();
      }
    });

    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
      setMouseCoordinates(event);
      isDrawing = false;
    });

    // Handle Mouse Coordinates
    function setMouseCoordinates(event) {
      mouseX = event.clientX - boundings.left;
      mouseY = event.clientY - boundings.top;
    }
  };


  var item_speed = 3;
var rect_color = null;
var g_rotation = 0.00001;
var g_rotation_total = 0;
var s_rotation = 0.00001;
var s_rotation_global = 0;
var drunk_shape = 1;
var breath_effect = 1;
var divs_number = null;
var blur = 0.4;
var test = 0;

class Rect{
  constructor(x, y, w, h, a){
    if (test == 0) {
      this.t = 1;
      test = 1;
    }
    else {
      this.t = 0;
    }
    this.color = Math.random(0, 1);
    this.wave = 0;
    this.size_augmentation_w = 3;
    this.size_augmentation_h = 3;
    this.color_shift = 0.01;
    this.x = x;
    this.y = y;
    this.w = w;
    this.first_w = w;
    this.h = h;
    this.first_h = h;
    this.a = a;
    let theta = random(TAU);
    this.dx = cos(theta)*random(item_speed);
    this.dy = sin(theta)*random(item_speed);
    this.hue = random();
    this.n = floor(random(5, 10));
    this.type = floor(random(0, 3));
  }

  //------------------------------------
  update(buffer){

    this.x += (this.dx * item_speed) + (Math.cos(this.wave)*breath_effect);
    this.y += this.dy * item_speed + (Math.cos(this.wave)*breath_effect);

    this.wave = this.wave + 0.1;

    if (this.x < 0 || this.x > buffer.width ) this.dx *= -1;
    if (this.y < 0 || this.y > buffer.height) this.dy *= -1;

    this.h = this.h + this.size_augmentation_h/2;

    if (this.h > this.first_h * 2) {
      this.size_augmentation_h = -3;
    }
    if (this.h < this.first_h) {
      this.size_augmentation_h = 3;
    }

    this.w = this.w + this.size_augmentation_w/2;

    if (this.w > this.first_w * 2) {
      this.size_augmentation_w = -3;
    }
    if (this.w < this.first_w) {
      this.size_augmentation_w = 3;
    }

    s_rotation_global += s_rotation;

    if (this.color > 1) {
      this.color_shift = -0.01;
    }
    if (this.color < 0) {
      this.color_shift = 0.01;
    }
    this.color = this.color + this.color_shift;

    console.log('GNEGNEGNE : '+ s_rotation);
  }

  //---------------------------------------
  render(buffer){
    buffer.push();
    buffer.translate(this.x, this.y);
    buffer.rotate(this.a + s_rotation_global);
    buffer.stroke(this.color, 1, 1);
    buffer.strokeWeight(this.w/75 + this.x/250);
    buffer.fill(0);
    if (this.type == 0){
      for (let i = 0; i < this.n; i++){
        let amt = i/this.n;
        buffer.line(amt*this.w, 0, amt*this.w, this.h);
      }
    }
    if (this.type == 1){
      buffer.ellipse(0, 0, this.w);
    }
    if (this.type == 2){
      //buffer.noFill();
      buffer.triangle(0, -this.h/2, this.w/2, this.h/2, -this.w/2, this.h/2);
    }
    buffer.pop();
  }
}

function setup (){
  console.log('IN SETUP PSYSHAPE');
  //let el4 = document.getElementById('element4');
  //el4.style.setProperty("background-color", #f8f9fa, "important");
  pixelDensity(1);
  //let fractales = window.open();
  //let div0 = createDiv('this is the parent');
  let canvasDiv = document.getElementById('canvasDiv')
  let canvas = createCanvas();
  canvas.parent(canvasDiv);
  //canvasDiv.appendChild(div);
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

let rects = [];
let buffer, divs;
let init = () => {
  let s = (width*height)/(814*814);
  rects = [];
  for (let i = 0; i < 200; i++){
    rects.push(new Rect(
      random(width),
      random(height),
      random(40*s, 100*s),
      random(40*s, 100*s),
      random(TAU)
    ))
  }

  divs = floor(random(8, 12))*2;
  const send_divs = {
    type: 'd',
    value: divs,
  }

  let w = Math.hypot(width, height)/2;
  let a = TAU/divs;
  let h = w*tan(a);
  buffer = createGraphics(w, h);
  buffer.colorMode(HSB, 1, 1, 1);
}

function draw(){
  background(0, blur);
  buffer.clear();
  rects.forEach(r => {
    r.update(buffer);
    r.render(buffer);
  });
  // buffer.background(1);
  buffer.fill(0);
  buffer.noStroke();
  buffer.triangle(0, 0, 0, buffer.height, buffer.width, buffer.height);
  push();
  translate(width/2, height/2);
  blendMode(ADD);
  for (let i = 0; i < divs; i++){
    push();
    let n = i;
    if ((divs/2)%2 == 0) n += i%2;
    rotate(n*TAU/divs + g_rotation_total );
    g_rotation_total += g_rotation;
    if (i%2 == 1) scale(-1, 1);
    image(buffer, 0, 0);
    pop();
  }
  pop();
}

function reload(){
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}
